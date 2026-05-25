import { Link } from 'react-router-dom'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import type { MessageWithReplies } from '../types'
import { AppShell } from './AppShell'
import { MessageCardSkeleton } from './Skeleton'

type MessagesPageProps = {
  messages: MessageWithReplies[]
  loading?: boolean
  onOpenComposer: () => void
  onToggleTheme: () => void
  theme: 'dark' | 'light'
  notificationBadge?: number
}

export function MessagesPage({ messages, loading, onOpenComposer, onToggleTheme, theme, notificationBadge }: MessagesPageProps) {
  return (
    <AppShell
      title="Messages"
      subtitle="Direct messages from people you follow."
      onOpenComposer={onOpenComposer}
      notificationBadge={notificationBadge}
      onToggleTheme={onToggleTheme}
      theme={theme}
    >
      <section className="rounded-[2rem] border border-fuchsia-300/20 bg-fuchsia-300 p-5 text-neutral-950 shadow-2xl shadow-fuchsia-300/10">
        <p className="mb-2 inline-flex rounded-full bg-neutral-950 px-3 py-1 text-xs font-bold text-fuchsia-200">
          Inbox
        </p>
        <h2 className="text-3xl font-black leading-tight">
          Messages from the support network.
        </h2>
        <p className="mt-3 text-sm font-medium text-neutral-800">
          Just conversations with other people on the app.
        </p>
      </section>

      <section className="space-y-4">
        {loading ? (
          <>
            <MessageCardSkeleton />
            <MessageCardSkeleton />
            <MessageCardSkeleton />
          </>
        ) : (
          <>
          {messages.map((message) => (
          <Link
            key={message.id}
            to={`/messages/${message.id}`}
            className="theme-elevated block rounded-[1.75rem] border p-4 transition hover:bg-[var(--color-elevated-hover)]"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-black">{message.name}</h3>
                  {message.replies.length > 0 && (
                    <span className="flex items-center gap-1 text-xs text-lime-300">
                      <ChatBubbleLeftRightIcon className="h-3 w-3" />
                      {message.replies.length}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {message.preview}
                </p>
              </div>
              <span className="shrink-0 text-xs font-bold" style={{ color: 'var(--color-text-subtle)' }}>
                {message.time}
              </span>
            </div>
          </Link>
          ))}
          </>
        )}
      </section>
    </AppShell>
  )
}
