import { motion } from 'framer-motion'
import { BriefcaseIcon } from '@heroicons/react/24/outline'
import type { Job } from '../types'
import { AppShell } from './AppShell'
import { formatCount } from '../utils/format'

type JobsPageProps = {
  jobs: Job[]
  onOpenComposer: () => void
  onApply: (id: string) => void
  onToggleTheme: () => void
  theme: 'dark' | 'light'
  notificationBadge?: number
}

export function JobsPage({ jobs, onOpenComposer, onApply, onToggleTheme, theme, notificationBadge }: JobsPageProps) {
  return (
    <AppShell
      title="Opportunities"
      subtitle="Jobs you're definitely getting ghosted from."
      onOpenComposer={onOpenComposer}
      notificationBadge={notificationBadge}
      onToggleTheme={onToggleTheme}
      theme={theme}
    >
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[2rem] border border-amber-300/20 bg-amber-300 p-5 text-neutral-950 shadow-2xl shadow-amber-300/10"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex rounded-full bg-neutral-950 px-3 py-1 text-xs font-bold text-amber-200">
              Dream roles
            </p>
            <h2 className="text-3xl font-black leading-tight">
              Jobs that match your "vibe."
            </h2>
          </div>
          <span className="mt-1 shrink-0 text-4xl" aria-hidden="true">
            <BriefcaseIcon className="h-10 w-10" />
          </span>
        </div>
        <p className="mb-5 text-sm font-medium text-neutral-800">
          Each one is worse than the last. Apply anyway.
        </p>
      </motion.section>

      <section className="space-y-4">
        {jobs.map((job, index) => (
          <motion.article
            key={job.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="theme-elevated rounded-[1.75rem] border p-4 shadow-xl"
            style={{ borderColor: 'var(--color-border)', boxShadow: '0 20px 25px -5px var(--color-shadow)' }}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="text-lg font-black">{job.title}</h3>
                  {job.urgent && (
                    <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-bold text-red-400">
                      URGENT
                    </span>
                  )}
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{job.company}</p>
              </div>
            </div>

            <p className="mb-3 text-sm font-bold text-lime-300">{job.salary}</p>
            <p className="mb-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {job.description}
            </p>

            <details className="mb-3">
              <summary className="cursor-pointer text-xs font-bold hover:text-zinc-300" style={{ color: 'var(--color-text-subtle)' }}>
                Requirements ({job.requirements.length})
              </summary>
              <ul className="mt-2 space-y-1">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    <span className="mt-0.5 text-red-400">✗</span>
                    {req}
                  </li>
                ))}
              </ul>
            </details>

            <div
              className="flex items-center justify-between border-t pt-3"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <span className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>
                {formatCount(job.applicants)} applicants · {job.posted}
              </span>
              <button
                type="button"
                onClick={() => onApply(job.id)}
                className="rounded-2xl bg-amber-300 px-4 py-2 text-xs font-black text-neutral-950 transition active:scale-[0.98]"
              >
                Apply & get ghosted
              </button>
            </div>
          </motion.article>
        ))}
      </section>
    </AppShell>
  )
}
