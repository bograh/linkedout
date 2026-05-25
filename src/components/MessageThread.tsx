import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import type { MessageWithReplies } from '../types'

type MessageThreadProps = {
  messages: MessageWithReplies[]
  onAddReply: (messageId: string, text: string) => void
}

export function MessageThread({ messages, onAddReply }: MessageThreadProps) {
  const { id } = useParams<{ id: string }>()
  const message = messages.find((m) => m.id === id)
  const [draft, setDraft] = useState('')

  if (!message) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <div className="text-center">
          <p className="mb-4 text-lg font-black">Message not found</p>
          <Link to="/messages" className="text-sm font-bold text-lime-300 underline">
            Back to messages
          </Link>
        </div>
      </div>
    )
  }

  const submitReply = () => {
    const text = draft.trim()
    if (!text) return
    onAddReply(message.id, text)
    setDraft('')
  }

  const allMessages = [
    {
      id: 'opener',
      name: message.name,
      text: message.preview,
      time: message.time,
      isMe: false,
    },
    ...message.replies.map((r, i) => ({
      id: `reply-${i}`,
      name: r.name,
      text: r.text,
      time: r.time,
      isMe: r.name === 'You',
    })),
  ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="mx-auto min-h-screen w-full max-w-md" style={{ background: 'var(--gradient-surface)' }}>
        <header
          className="sticky top-0 z-20 border-b px-4 py-3 backdrop-blur-xl"
          style={{ background: 'var(--color-header)', borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-center gap-3">
            <Link
              to="/messages"
              className="flex h-9 w-9 items-center justify-center rounded-2xl border"
              style={{ background: 'var(--color-elevated)', borderColor: 'var(--color-border)' }}
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-lg font-black">{message.name}</h1>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Direct message</p>
            </div>
          </div>
        </header>

        <main className="space-y-4 px-4 pb-28 pt-4">
          {allMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-[1.5rem] px-4 py-3 ${
                  msg.isMe
                    ? 'rounded-br-md bg-lime-300 text-neutral-950'
                    : 'rounded-bl-md border'
                }`}
                style={msg.isMe ? {} : { borderColor: 'var(--color-border)', background: 'var(--color-elevated)', color: 'var(--color-text-secondary)' }}
              >
                {!msg.isMe && (
                  <p className="mb-1 text-xs font-bold text-lime-300">{msg.name}</p>
                )}
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p
                  className={`mt-1 text-[10px] ${msg.isMe ? 'text-neutral-700' : ''}`}
                  style={msg.isMe ? {} : { color: 'var(--color-text-subtle)' }}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </main>

        <div className="fixed bottom-3 left-1/2 z-30 w-[calc(100%-1.5rem)] max-w-[24rem] -translate-x-1/2">
          <div
            className="flex gap-2 rounded-[1.75rem] border p-3 shadow-2xl backdrop-blur-xl"
            style={{ background: 'var(--color-header)', borderColor: 'var(--color-border)', boxShadow: '0 25px 50px -12px var(--color-shadow)' }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  submitReply()
                }
              }}
              placeholder="Reply..."
              className="min-w-0 flex-1 rounded-2xl px-4 py-3 text-sm outline-none placeholder:text-[var(--color-text-subtle)]"
              style={{ background: 'var(--color-input)', color: 'var(--color-text)' }}
            />
            <button
              type="button"
              onClick={submitReply}
              className="shrink-0 rounded-2xl bg-lime-300 px-5 py-3 text-sm font-black text-neutral-950 transition active:scale-[0.98]"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
