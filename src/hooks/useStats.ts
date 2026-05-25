import { useState } from 'react'
import type { Stat } from '../types'
import { stats as seedStats } from '../data/seed'

const STORAGE_KEY = 'linkedout_stats'

function loadStats(): Stat[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length === seedStats.length) {
        return parsed
      }
    }
  } catch {
    // localStorage unavailable or corrupted
  }
  return seedStats
}

function saveStats(stats: Stat[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  } catch {
    // localStorage unavailable or corrupted
  }
}

export function useStats() {
  const [stats, setStats] = useState<Stat[]>(() => loadStats())

  const incrementPosts = () => {
    const updated = stats.map((s) =>
      s.label === 'Posts today' ? { ...s, value: s.value + 1 } : s,
    )
    setStats(updated)
    saveStats(updated)
  }

  const incrementReplies = () => {
    const updated = stats.map((s) =>
      s.label === 'Replies sent' ? { ...s, value: s.value + 1 } : s,
    )
    setStats(updated)
    saveStats(updated)
  }

  return { stats, incrementPosts, incrementReplies }
}
