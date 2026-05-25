import { useState, useCallback } from 'react'
import type { Stat } from '../types'
import { stats as seedStats } from '../data/seed'

const STORAGE_KEY = 'linkedout_stats'

function loadStats(): Stat[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Stat[]
      if (Array.isArray(parsed) && parsed.length === seedStats.length) {
        return parsed
      }
    }
  } catch { /* ignore */ }
  return seedStats
}

function saveStats(stats: Stat[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stats)) } catch { /* ignore */ }
}

export function useStats() {
  const [stats, setStats] = useState<Stat[]>(loadStats)

  const incrementPosts = useCallback(() => {
    setStats((current) => {
      const updated = current.map((s) =>
        s.label === 'Posts today' ? { ...s, value: s.value + 1 } : s,
      )
      saveStats(updated)
      return updated
    })
  }, [])

  const incrementReplies = useCallback(() => {
    setStats((current) => {
      const updated = current.map((s) =>
        s.label === 'Replies sent' ? { ...s, value: s.value + 1 } : s,
      )
      saveStats(updated)
      return updated
    })
  }, [])

  return { stats, incrementPosts, incrementReplies }
}
