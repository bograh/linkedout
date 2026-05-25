import { useState } from 'react'
import type { Notification } from '../types'
import { seedNotifications } from '../data/notifications'

const STORAGE_KEY = 'linkedout_notifications'

function loadNotifications(): Notification[] {
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
  return seedNotifications
}

function saveNotifications(notifications: Notification[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
  } catch {
    // localStorage unavailable or corrupted
  }
}

export function useNotifications() {
  const [notifs, setNotifs] = useState<Notification[]>(() => loadNotifications())

  const markAllRead = () => {
    const updated = notifs.map((n) => ({ ...n, read: true }))
    setNotifs(updated)
    saveNotifications(updated)
  }

  const unreadCount = notifs.filter((n) => !n.read).length

  return { notifications: notifs, unreadCount, markAllRead }
}
