import { useState, useEffect, useCallback, useRef } from 'react'
import type { Comment, Post } from '../types'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { seedPosts, seedComments, nameLeft, nameRight, tagPool, iconPool } from '../data/seed'
import { checkRateLimit } from '../lib/rateLimit'

const PAGE_SIZE = 10

function shuffle<T>(array: T[]): T[] {
  const a = [...array]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function randomUsername() {
  const left = randomItem(nameLeft)
  const right = randomItem(nameRight)
  const suffix = Math.floor(Math.random() * 900 + 100)
  return `${left}${right}${suffix}`
}

let nextId = Date.now()
let nextCommentId = Date.now() + 1000

function mapPost(row: Record<string, unknown>): Post {
  return {
    id: row.id as string,
    name: row.name as string,
    tag: row.tag as string,
    time: row.time as string,
    icon: row.icon as string,
    text: row.text as string,
    reactions: (row.reactions as number) ?? 0,
    comments: (row.comments_count as number) ?? 0,
  }
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>(() => {
    if (isSupabaseConfigured) return []
    const raw = localStorage.getItem('linkedout_posts')
    if (raw) try { return shuffle(JSON.parse(raw) as Post[]) } catch { /* ignore */ }
    return shuffle(seedPosts)
  })
  const [comments, setComments] = useState<Record<string, Comment[]>>(() => {
    if (isSupabaseConfigured) return {}
    const raw = localStorage.getItem('linkedout_comments')
    if (raw) try { return JSON.parse(raw) as Record<string, Comment[]> } catch { /* ignore */ }
    return seedComments
  })
  const [loading, setLoading] = useState(() => isSupabaseConfigured)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [hashtagResults, setHashtagResults] = useState<Post[] | null>(null)
  const shuffledIdsRef = useRef<string[]>([])
  const visibleCountRef = useRef(PAGE_SIZE)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return
    ;(async () => {
      try {
        const { data: allIds } = await supabase.from('posts').select('id')
        if (!allIds || allIds.length === 0) {
          setLoading(false)
          return
        }
        const ids = shuffle(allIds.map((r) => r.id))
        shuffledIdsRef.current = ids
        setHasMore(ids.length > PAGE_SIZE)

        const chunk = ids.slice(0, PAGE_SIZE)
        const { data } = await supabase.from('posts').select('*').in('id', chunk)
        if (data) {
          const ordered = chunk.map((id) => data.find((r: Record<string, unknown>) => r.id === id)).filter(Boolean) as Post[]
          setPosts(ordered.map(mapPost))
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const loadMore = useCallback(async () => {
    if (!supabase || loadingMore || !hasMore) return
    setLoadingMore(true)
    const ids = shuffledIdsRef.current
    const current = visibleCountRef.current
    const next = current + PAGE_SIZE
    const chunk = ids.slice(current, next)
    if (chunk.length === 0) {
      setHasMore(false)
      setLoadingMore(false)
      return
    }
    const { data } = await supabase.from('posts').select('*').in('id', chunk)
    if (data) {
      const ordered = chunk.map((id) => data.find((r: Record<string, unknown>) => r.id === id)).filter(Boolean) as Post[]
      setPosts((prev) => [...prev, ...ordered.map(mapPost)])
      visibleCountRef.current = next
      setHasMore(next < ids.length)
    }
    setLoadingMore(false)
  }, [loadingMore, hasMore])

  const persist = useCallback((p: Post[]) => {
    if (isSupabaseConfigured) return
    try { localStorage.setItem('linkedout_posts', JSON.stringify(p)) } catch { /* ignore */ }
  }, [])

  const addPost = useCallback(async (text: string) => {
    const { allowed, remaining } = await checkRateLimit()
    if (!allowed) {
      throw new Error(`Rate limited. ${remaining} posts remaining. Try again later.`)
    }

    const post: Post = {
      id: String(nextId++),
      name: randomUsername(),
      tag: randomItem(tagPool),
      time: 'now',
      icon: randomItem(iconPool),
      text,
      reactions: 0,
      comments: 0,
    }
    setPosts((current) => {
      const updated = [post, ...current]
      persist(updated)
      return updated
    })
    if (supabase) {
      const { data } = await supabase.from('posts').insert({
        name: post.name, tag: post.tag, time: post.time,
        icon: post.icon, text: post.text,
      }).select()
      if (data && data[0]) {
        setPosts((current) =>
          current.map((p) => (p.id === post.id ? { ...p, id: data[0].id } : p)),
        )
        post.id = data[0].id
      }
    }
    return { post, remaining }
  }, [persist])

  const deletePost = useCallback(async (id: string) => {
    setPosts((current) => {
      const updated = current.filter((p) => p.id !== id)
      persist(updated)
      return updated
    })
    if (supabase) {
      await supabase.from('posts').delete().eq('id', id)
    }
  }, [persist])

  const reactToPost = useCallback(async (id: string) => {
    const currentReactions = posts.find((p) => p.id === id)?.reactions ?? 0
    setPosts((current) => {
      const updated = current.map((p) =>
        p.id === id ? { ...p, reactions: p.reactions + 1 } : p,
      )
      persist(updated)
      return updated
    })
    if (supabase) {
      await supabase.from('posts').update({ reactions: currentReactions + 1 }).eq('id', id)
    }
  }, [posts, persist])

  const addComment = useCallback(async (postId: string, text: string) => {
    const comment: Comment = {
      id: String(nextCommentId++),
      name: randomUsername(),
      text,
      time: 'now',
    }
    setComments((current) => {
      const postComments = current[postId] ?? []
      return { ...current, [postId]: [...postComments, comment] }
    })
    setPosts((current) => {
      const updated = current.map((p) =>
        p.id === postId ? { ...p, comments: p.comments + 1 } : p,
      )
      persist(updated)
      return updated
    })
    if (supabase) {
      await supabase.from('comments').insert({
        post_id: postId, name: comment.name, text: comment.text, time: comment.time,
      })
      await supabase.from('posts').update({ comments_count: (posts.find(p => p.id === postId)?.comments ?? 0) + 1 }).eq('id', postId)
    }
  }, [posts, persist])

  const searchByHashtag = useCallback(async (tag: string) => {
    if (supabase) {
      const { data } = await supabase.from('posts').select('*').ilike('text', `%${tag}%`)
      if (data) setHashtagResults(data.map(mapPost))
    } else {
      const filtered = posts.filter((p) => p.text.toLowerCase().includes(tag.toLowerCase()))
      setHashtagResults(filtered)
    }
  }, [posts])

  const clearHashtagFilter = useCallback(() => {
    setHashtagResults(null)
  }, [])

  const refresh = useCallback(async () => {
    if (!supabase) return
    try {
      const [idsRes, commentsRes] = await Promise.all([
        supabase.from('posts').select('id'),
        supabase.from('comments').select('*').order('created_at', { ascending: true }),
      ])
      if (idsRes.data && idsRes.data.length > 0) {
        const ids = shuffle(idsRes.data.map((r) => r.id))
        shuffledIdsRef.current = ids
        visibleCountRef.current = PAGE_SIZE
        setHasMore(ids.length > PAGE_SIZE)
        const chunk = ids.slice(0, PAGE_SIZE)
        const { data } = await supabase.from('posts').select('*').in('id', chunk)
        if (data) {
          const ordered = chunk.map((id) => data.find((r: Record<string, unknown>) => r.id === id)).filter(Boolean) as Post[]
          setPosts(ordered.map(mapPost))
        }
      } else {
        setPosts([])
        shuffledIdsRef.current = []
        setHasMore(false)
      }
      if (commentsRes.data && commentsRes.data.length > 0) {
        const grouped: Record<string, Comment[]> = {}
        for (const c of commentsRes.data) {
          const row = c as Record<string, unknown>
          const pid = (row.post_id as string) ?? ''
          if (!grouped[pid]) grouped[pid] = []
          grouped[pid].push(row as unknown as Comment)
        }
        setComments(grouped)
      }
    } catch {
      // refresh failed silently
    }
  }, [])

  return { posts, comments, loading, loadingMore, hasMore, loadMore, refresh, hashtagResults, searchByHashtag, clearHashtagFilter, addPost, deletePost, reactToPost, addComment }
}
