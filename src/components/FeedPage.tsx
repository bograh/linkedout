import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FireIcon, XMarkIcon } from '@heroicons/react/24/outline'
import type { Post, Stat } from '../types'
import { extractHashtags } from '../utils/hashtags'
import { AppShell } from './AppShell'
import { Button } from './Button'
import { PostCard } from './PostCard'
import { DigestCard } from './DigestCard'
import { PullToRefresh } from './PullToRefresh'

type FeedPageProps = {
  posts: Post[]
  stats: Stat[]
  onOpenComposer: () => void
  onReact: (id: string) => void
  onDeletePost: (id: string) => void
  onToggleTheme: () => void
  theme: 'dark' | 'light'
  notificationBadge?: number
}

function trendingHashtags(posts: Post[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const post of posts) {
    for (const tag of extractHashtags(post.text)) {
      counts.set(tag, (counts.get(tag) || 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
}

export function FeedPage({ posts, stats, onOpenComposer, onReact, onDeletePost, onToggleTheme, theme, notificationBadge }: FeedPageProps) {
  const [filterTag, setFilterTag] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 1200))
    setRefreshKey((k) => k + 1)
  }, [])

  const filtered = filterTag
    ? posts.filter((p) => extractHashtags(p.text).includes(filterTag))
    : posts

  const tags = trendingHashtags(posts)

  return (
    <AppShell
      title="The Woe Feed"
      subtitle="A simple place to share how bad the search is going."
      onOpenComposer={onOpenComposer}
      notificationBadge={notificationBadge}
      onToggleTheme={onToggleTheme}
      theme={theme}
    >
      <PullToRefresh onRefresh={handleRefresh} key={refreshKey}>
        <DigestCard stats={stats} postCount={posts.length} />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[2rem] border border-lime-300/20 bg-lime-300 p-5 text-neutral-950 shadow-2xl shadow-lime-300/10"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex rounded-full bg-neutral-950 px-3 py-1 text-xs font-bold text-lime-200">
              Today's crisis
            </p>
            <h2 className="text-3xl font-black leading-tight">
              Share your job-hunt trauma.
            </h2>
          </div>
          <span className="mt-1 shrink-0 text-4xl" aria-hidden="true">
            <FireIcon className="h-10 w-10" />
          </span>
        </div>
        <p className="mb-5 text-sm font-medium text-neutral-800">
          Post rejection stories and find other people who are dealing with the
          same mess.
        </p>
        <Button className="w-full" onClick={onOpenComposer}>
          <span className="mr-2">+</span> Write a post
        </Button>
      </motion.section>

      <section className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="theme-elevated rounded-3xl border p-3"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <stat.icon className="mb-3 h-5 w-5 text-[var(--color-text)]" />
            <p className="text-lg font-black" style={{ color: 'var(--color-text)' }}>{stat.value}</p>
            <p className="text-[11px] leading-tight" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
          </div>
        ))}
      </section>

      {tags.length > 0 && (
        <section className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold" style={{ color: 'var(--color-text-subtle)' }}>Trending:</span>
          {tags.map((t) => (
            <button
              key={t.tag}
              type="button"
              onClick={() => setFilterTag(t.tag)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                filterTag === t.tag
                  ? 'bg-lime-300 text-neutral-950'
                  : 'theme-elevated-hover text-[var(--color-text-muted)] hover:text-lime-300'
              }`}
            >
              #{t.tag} {t.count}
            </button>
          ))}
        </section>
      )}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-black">
            {filterTag ? `#${filterTag}` : 'The Woe Feed'}
          </h3>
          {filterTag ? (
            <button
              type="button"
              onClick={() => setFilterTag(null)}
              className="flex items-center gap-1 text-xs font-bold hover:text-lime-300"
              style={{ color: 'var(--color-text-subtle)' }}
            >
              <XMarkIcon className="h-3 w-3" />
              Clear filter
            </button>
          ) : (
            <span className="text-sm font-bold" style={{ color: 'var(--color-text-subtle)' }}>Latest</span>
          )}
        </div>
        <div className="space-y-4">
          {filtered.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index}
              onReact={onReact}
              onDelete={onDeletePost}
              onHashtagClick={setFilterTag}
            />
          ))}
          {filtered.length === 0 && (
            <p
              className="theme-elevated rounded-[1.75rem] border p-4 text-center text-sm"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-subtle)' }}
            >
              No posts with #{filterTag}. Be the first to rant about it.
            </p>
          )}
        </div>
      </section>
      </PullToRefresh>
    </AppShell>
  )
}
