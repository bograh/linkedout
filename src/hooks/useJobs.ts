import { useState } from 'react'
import type { Job } from '../types'
import { seedJobs } from '../data/jobs'

const STORAGE_KEY = 'linkedout_jobs'

function loadJobs(): Job[] {
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
  return seedJobs
}

function saveJobs(jobs: Job[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
  } catch {
    // localStorage unavailable or corrupted
  }
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>(() => loadJobs())

  const apply = (id: string) => {
    const updated = jobs.map((j) =>
      j.id === id ? { ...j, applicants: j.applicants + 1 } : j,
    )
    setJobs(updated)
    saveJobs(updated)
  }

  return { jobs, apply }
}
