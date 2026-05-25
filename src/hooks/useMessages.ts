import { useState, useEffect, useCallback } from 'react'
import type { MessageWithReplies } from '../types'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { seedMessages } from '../data/seed'

const STORAGE_KEY = 'linkedout_messages'

function loadMessages(): MessageWithReplies[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as MessageWithReplies[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch { /* ignore */ }
  return seedMessages
}

function saveMessages(messages: MessageWithReplies[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)) } catch { /* ignore */ }
}

export function useMessages() {
  const [messages, setMessages] = useState<MessageWithReplies[]>(loadMessages)
  const [loading, setLoading] = useState(() => isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return
    ;(async () => {
      try {
        const [msgRes, replyRes] = await Promise.all([
          supabase.from('messages').select('*').order('created_at', { ascending: false }),
          supabase.from('message_replies').select('*').order('created_at', { ascending: true }),
        ])
        if (!msgRes.data || msgRes.data.length === 0) return
        const replyMap: Record<string, { name: string; text: string; time: string }[]> = {}
        if (replyRes.data) {
          for (const r of replyRes.data) {
            const row = r as Record<string, unknown>
            const mid = row.message_id as string
            if (!replyMap[mid]) replyMap[mid] = []
            replyMap[mid].push({ name: row.name as string, text: row.text as string, time: row.time as string })
          }
        }
        const mapped: MessageWithReplies[] = msgRes.data.map((m) => {
          const row = m as Record<string, unknown>
          return {
            id: row.id as string,
            name: row.name as string,
            preview: row.preview as string,
            time: row.time as string,
            replies: replyMap[row.id as string] ?? [],
          }
        })
        setMessages(mapped)
        saveMessages(mapped)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const addReply = useCallback(async (messageId: string, text: string) => {
    const reply = { name: 'You', text, time: 'now' }
    setMessages((current) => {
      const updated = current.map((m) =>
        m.id === messageId ? { ...m, replies: [...m.replies, reply] } : m,
      )
      saveMessages(updated)
      return updated
    })
    if (supabase) {
      await supabase.from('message_replies').insert({
        message_id: messageId, name: reply.name, text: reply.text, time: reply.time,
      })
    }
  }, [])

  return { messages, loading, addReply }
}
