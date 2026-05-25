import { useState } from 'react'
import type { MessageWithReplies } from '../types'
import { seedMessages } from '../data/seed'

const STORAGE_KEY = 'linkedout_messages'

function loadMessages(): MessageWithReplies[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch {
    // localStorage unavailable or corrupted
  }
  return seedMessages
}

function saveMessages(messages: MessageWithReplies[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  } catch {
    // localStorage unavailable or corrupted
  }
}

export function useMessages() {
  const [messages, setMessages] = useState<MessageWithReplies[]>(() => loadMessages())

  const addReply = (messageId: string, text: string) => {
    const updated = messages.map((m) =>
      m.id === messageId
        ? { ...m, replies: [...m.replies, { name: 'You', text, time: 'now' }] }
        : m,
    )
    setMessages(updated)
    saveMessages(updated)
  }

  return { messages, addReply }
}
