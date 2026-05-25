import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  ChatBubbleLeftRightIcon,
  FaceFrownIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import type { Post } from '../types'
import { formatCount } from '../utils/format'
import { Icon } from './Icon'
import { HashtagText } from './HashtagText'
import { ConfirmDialog } from './ConfirmDialog'

type PostCardProps = {
  post: Post
  index: number
  onReact: (id: string) => void
  onDelete: (id: string) => void
  onHashtagClick: (tag: string) => void
}

export function PostCard({ post, index, onReact, onDelete, onHashtagClick }: PostCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const sharePost = useCallback(async () => {
    const shareData = {
      title: 'LinkedOut',
      text: `"${post.text}" — ${post.name}`,
      url: `${window.location.origin}/post/${post.id}`,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`)
        setToast('Copied to clipboard')
        setTimeout(() => setToast(null), 2000)
      } catch {
        setToast('Could not copy')
        setTimeout(() => setToast(null), 2000)
      }
    }
  }, [post])

  return (
    <>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-lime-300 px-5 py-3 text-sm font-black text-neutral-950 shadow-xl"
        >
          {toast}
        </motion.div>
      )}

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        className="theme-elevated group relative rounded-[1.75rem] border p-4 shadow-xl"
        style={{ borderColor: 'var(--color-border)', boxShadow: '0 20px 25px -5px var(--color-shadow), 0 8px 10px -6px var(--color-shadow)' }}
      >
        <button
          type="button"
          onClick={() => setShowMenu((v) => !v)}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-xl transition hover:bg-[var(--color-elevated-hover)]"
          style={{ color: 'var(--color-text-subtle)' }}
          aria-label="Post menu"
        >
          <span className="text-lg font-black leading-none">⋯</span>
        </button>

        {showMenu && (
          <div
            className="absolute right-3 top-11 z-10 min-w-[140px] rounded-2xl border p-1.5 shadow-2xl"
            style={{ background: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)', boxShadow: '0 25px 50px -12px var(--color-shadow)' }}
          >
            <Link
              to={`/post/${post.id}`}
              onClick={() => setShowMenu(false)}
              className="block w-full rounded-xl px-3 py-2 text-left text-sm font-bold hover:bg-[var(--color-elevated-hover)]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              View post
            </Link>
            <button
              type="button"
              onClick={() => {
                setShowMenu(false)
                setShowDeleteConfirm(true)
              }}
              className="block w-full rounded-xl px-3 py-2 text-left text-sm font-bold text-red-400 hover:bg-[var(--color-elevated-hover)]"
            >
              Delete post
            </button>
          </div>
        )}

        <div className="mb-4 flex gap-3">
          <div className="theme-icon-bg flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl">
            <Icon name={post.icon} className="h-6 w-6 text-[var(--color-text)]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h4 className="truncate font-bold">{post.name}</h4>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {post.tag} · {post.time}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link to={`/post/${post.id}`} className="block">
          <p className="mb-4 text-[15px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            <HashtagText text={post.text} onHashtagClick={onHashtagClick} />
          </p>
        </Link>

        <div
          className="flex items-center justify-between border-t pt-3 text-xs font-bold"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
        >
          <button
            onClick={() => onReact(post.id)}
            className="flex items-center gap-1.5 transition hover:text-lime-300"
          >
            <FaceFrownIcon className="h-4 w-4" />
            {formatCount(post.reactions)} same bro
          </button>
          <Link
            to={`/post/${post.id}`}
            className="flex items-center gap-1.5 transition hover:text-lime-300"
          >
            <ChatBubbleLeftRightIcon className="h-4 w-4" />
            {formatCount(post.comments)} condolences
          </Link>
          <button
            onClick={sharePost}
            className="flex items-center gap-1.5 transition hover:text-lime-300"
          >
            <PaperAirplaneIcon className="h-4 w-4" />
            share
          </button>
        </div>
      </motion.article>

      {showDeleteConfirm && (
        <ConfirmDialog
          title="Delete post"
          message="Are you sure you want to delete this post? This cannot be undone."
          confirmLabel="Delete"
          onConfirm={() => {
            onDelete(post.id)
            setShowDeleteConfirm(false)
          }}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  )
}
