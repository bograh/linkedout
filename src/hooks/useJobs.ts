import { useState, useEffect, useCallback } from 'react'
import type { Job } from '../types'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { seedJobs } from '../data/seed'

const STORAGE_KEY = 'linkedout_jobs'

function loadJobs(): Job[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Job[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch { /* ignore */ }
  return seedJobs
}

function saveJobs(jobs: Job[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs)) } catch { /* ignore */ }
}

function mapJob(row: Record<string, unknown>): Job {
  return {
    id: row.id as string,
    company: row.company as string,
    title: row.title as string,
    salary: row.salary as string,
    requirements: (row.requirements as string[]) ?? [],
    description: row.description as string,
    applicants: (row.applicants as number) ?? 0,
    posted: row.posted as string,
    urgent: (row.urgent as boolean) ?? false,
  }
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>(loadJobs)
  const [loading, setLoading] = useState(() => isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return
    ;(async () => {
      try {
        const { data } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
        if (data && data.length > 0) {
          setJobs(data.map(mapJob))
          saveJobs(data.map(mapJob))
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const apply = useCallback(async (id: string) => {
    const currentJob = jobs.find((j) => j.id === id)
    setJobs((current) => {
      const updated = current.map((j) =>
        j.id === id ? { ...j, applicants: j.applicants + 1 } : j,
      )
      saveJobs(updated)
      return updated
    })
    if (supabase && currentJob) {
      await supabase.from('jobs').update({ applicants: currentJob.applicants + 1 }).eq('id', id)
    }
  }, [jobs])

  return { jobs, loading, apply }
}
