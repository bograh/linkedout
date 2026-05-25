import { useState, useEffect, useCallback } from 'react'
import type { Notification } from '../types'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { seedNotifications } from '../data/seed'

const STORAGE_KEY = 'linkedout_notifications'

function loadNotifications(): Notification[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Notification[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch { /* ignore */ }
  return seedNotifications
}

function saveNotifications(notifications: Notification[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications)) } catch { /* ignore */ }
}

function mapNotification(row: Record<string, unknown>): Notification {
  return {
    id: row.id as string,
    icon: row.icon as string,
    text: row.text as string,
    time: row.time as string,
    read: (row.read as boolean) ?? false,
  }
}

export function useNotifications() {
  const [notifs, setNotifs] = useState<Notification[]>(loadNotifications)
  const [loading, setLoading] = useState(() => isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return
    ;(async () => {
      try {
        const { data } = await supabase.from('notifications').select('*').order('created_at', { ascending: false })
        if (data && data.length > 0) {
          setNotifs(data.map(mapNotification))
          saveNotifications(data.map(mapNotification))
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const markAllRead = useCallback(async () => {
    const updated = notifs.map((n) => ({ ...n, read: true }))
    setNotifs(updated)
    saveNotifications(updated)
    if (supabase) {
      await supabase.from('notifications').update({ read: true }).eq('read', false)
    }
  }, [notifs])

  const unreadCount = notifs.filter((n) => !n.read).length

  return { notifications: notifs, unreadCount, loading, markAllRead }
}
