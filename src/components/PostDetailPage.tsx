import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import type { Comment, Post } from '../types'
import { Icon } from './Icon'

type PostDetailPageProps = {
  posts: Post[]
  comments: Record<string, Comment[]>
  onReact: (id: string) => void
  onAddComment: (postId: string, text: string) => void
}

export function PostDetailPage({ posts, comments, onReact, onAddComment }: PostDetailPageProps) {
  const { id } = useParams<{ id: string }>()
  const post = posts.find((p) => p.id === id)
  const [draft, setDraft] = useState('')

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <div className="text-center">
          <p className="mb-4 text-lg font-black">Post not found</p>
          <Link to="/feed" className="text-sm font-bold text-lime-300 underline">
            Back to feed
          </Link>
        </div>
      </div>
    )
  }

  const postComments = comments[post.id] ?? []

  const submitComment = () => {
    const text = draft.trim()
    if (!text) return
    onAddComment(post.id, text)
    setDraft('')
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="mx-auto min-h-screen w-full max-w-md" style={{ background: 'var(--gradient-surface)' }}>
        <header
          className="sticky top-0 z-20 border-b px-4 py-3 backdrop-blur-xl"
          style={{ background: 'var(--color-header)', borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-center gap-3">
            <Link
              to="/feed"
              className="flex h-9 w-9 items-center justify-center rounded-2xl border"
              style={{ background: 'var(--color-elevated)', borderColor: 'var(--color-border)' }}
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-lg font-black">Post</h1>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Anonymous social feed</p>
            </div>
          </div>
        </header>

        <main className="space-y-5 px-4 pb-28 pt-4">
          <article
            className="theme-elevated rounded-[1.75rem] border p-4 shadow-xl"
            style={{ borderColor: 'var(--color-border)', boxShadow: '0 20px 25px -5px var(--color-shadow)' }}
          >
            <div className="mb-4 flex gap-3">
              <div className="theme-icon-bg flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl">
                <Icon name={post.icon} className="h-6 w-6 text-[var(--color-text)]" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate font-bold">{post.name}</h4>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {post.tag} · {post.time}
                </p>
              </div>
            </div>
            <p className="mb-4 text-[15px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {post.text}
            </p>
            <div
              className="flex items-center gap-4 border-t pt-3 text-xs font-bold"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
            >
              <button
                onClick={() => onReact(post.id)}
                className="flex items-center gap-1.5 transition hover:text-lime-300"
              >
                {post.reactions} same bro
              </button>
              <span className="flex items-center gap-1.5">
                {post.comments} condolences
              </span>
            </div>
          </article>

          <section>
            <h3 className="mb-3 text-lg font-black">
              Condolences ({postComments.length})
            </h3>
            <div className="space-y-3">
              {postComments.length === 0 && (
                <p
                  className="rounded-[1.75rem] border p-4 text-sm"
                  style={{ background: 'var(--color-empty-bg)', borderColor: 'var(--color-empty-border)', color: 'var(--color-empty-text)' }}
                >
                  No condolences yet. Be the first to sympathize.
                </p>
              )}
              {postComments.map((comment) => (
                <div
                  key={comment.id}
                  className="theme-elevated rounded-[1.75rem] border p-4"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-bold">{comment.name}</span>
                    <span className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>{comment.time}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{comment.text}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  submitComment()
                }
              }}
              placeholder="Send a condolence..."
              className="min-w-0 flex-1 rounded-2xl border px-4 py-3 text-sm outline-none placeholder:text-[var(--color-text-subtle)] focus:border-lime-300"
              style={{ background: 'var(--color-input)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            />
            <button
              type="button"
              onClick={submitComment}
              className="shrink-0 rounded-2xl bg-lime-300 px-4 py-3 text-sm font-black text-neutral-950 transition active:scale-[0.98]"
            >
              Send
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
