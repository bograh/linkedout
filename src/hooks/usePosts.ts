import { useState } from 'react'
import type { Comment, Post } from '../types'
import { seedPosts, seedComments, nameLeft, nameRight, tagPool, iconPool } from '../data/seed'

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function randomUsername() {
  const left = randomItem(nameLeft)
  const right = randomItem(nameRight)
  const suffix = Math.floor(Math.random() * 900 + 100)
  return `${left}${right}${suffix}`
}

const POSTS_KEY = 'linkedout_posts'
const COMMENTS_KEY = 'linkedout_comments'

function loadPosts(): Post[] {
  try {
    const raw = localStorage.getItem(POSTS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch {
    // localStorage unavailable or corrupted
  }
  return seedPosts
}

function savePosts(posts: Post[]) {
  try {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
  } catch {
    // localStorage unavailable or corrupted
  }
}

function loadComments(): Record<string, Comment[]> {
  try {
    const raw = localStorage.getItem(COMMENTS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed as Record<string, Comment[]>
      }
    }
  } catch {
    // localStorage unavailable or corrupted
  }
  return seedComments
}

function saveComments(comments: Record<string, Comment[]>) {
  try {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments))
  } catch {
    // localStorage unavailable or corrupted
  }
}

let nextId = Date.now()
let nextCommentId = Date.now() + 1000

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>(() => loadPosts())
  const [comments, setComments] = useState<Record<string, Comment[]>>(() => loadComments())

  const addPost = (text: string) => {
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
    const updated = [post, ...posts]
    setPosts(updated)
    savePosts(updated)
    return updated
  }

  const deletePost = (id: string) => {
    const updated = posts.filter((p) => p.id !== id)
    setPosts(updated)
    savePosts(updated)
  }

  const reactToPost = (id: string) => {
    const updated = posts.map((p) =>
      p.id === id ? { ...p, reactions: p.reactions + 1 } : p,
    )
    setPosts(updated)
    savePosts(updated)
  }

  const addComment = (postId: string, text: string) => {
    const comment: Comment = {
      id: String(nextCommentId++),
      name: randomUsername(),
      text,
      time: 'now',
    }
    const postComments = comments[postId] ?? []
    const updatedComments = { ...comments, [postId]: [...postComments, comment] }
    setComments(updatedComments)
    saveComments(updatedComments)

    const updatedPosts = posts.map((p) =>
      p.id === postId ? { ...p, comments: p.comments + 1 } : p,
    )
    setPosts(updatedPosts)
    savePosts(updatedPosts)
  }

  return { posts, comments, addPost, deletePost, reactToPost, addComment }
}
