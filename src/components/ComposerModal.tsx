import { useState } from 'react'
import { motion } from 'framer-motion'

type ComposerModalProps = {
  onSubmit: (text: string) => void
  onClose: () => void
}

const MAX_CHARS = 280

const grievanceLabels = [
  { threshold: 0, label: 'Bottling it up' },
  { threshold: 30, label: 'Starting to vent' },
  { threshold: 80, label: 'Getting heated' },
  { threshold: 140, label: 'Full rant mode' },
  { threshold: 220, label: 'Therapy session' },
  { threshold: MAX_CHARS, label: 'Let it all out' },
]

function getGrievanceLabel(count: number) {
  let label = grievanceLabels[grievanceLabels.length - 1].label
  for (const g of grievanceLabels) {
    if (count < g.threshold) break
    label = g.label
  }
  return label
}

export function ComposerModal({ onSubmit, onClose }: ComposerModalProps) {
  const [draft, setDraft] = useState('')

  const chars = draft.length
  const label = getGrievanceLabel(chars)
  const progress = Math.min((chars / MAX_CHARS) * 100, 100)
  const overLimit = chars > MAX_CHARS

  const submit = () => {
    const content = draft.trim()
    if (!content || overLimit) return
    onSubmit(content)
    setDraft('')
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center p-4 backdrop-blur-sm" style={{ background: 'var(--color-overlay)' }}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-[2rem] border p-4 shadow-2xl"
        style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)', boxShadow: '0 25px 50px -12px var(--color-shadow)' }}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black">New post</h2>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Your username is generated when you publish.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="theme-elevated rounded-2xl border px-3 py-2 text-sm font-bold"
            style={{ borderColor: 'var(--color-border)' }}
          >
            Close
          </button>
        </div>

        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-bold" style={{ color: 'var(--color-text-subtle)' }}>{label}</span>
          <span className={`font-black ${overLimit ? 'text-red-400' : ''}`} style={{ color: overLimit ? undefined : 'var(--color-text-muted)' }}>
            {chars}/{MAX_CHARS}
          </span>
        </div>

        <div className="mb-3 h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--color-icon-bg)' }}>
          <motion.div
            className={`h-full rounded-full ${overLimit ? 'bg-red-500' : 'bg-lime-300'}`}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>

        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="h-32 w-full resize-none rounded-3xl border p-4 text-sm outline-none placeholder:text-[var(--color-text-subtle)] focus:border-lime-300"
          style={{ background: 'var(--color-input)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          placeholder="Share what happened today..."
          autoFocus
        />
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="theme-elevated flex-1 rounded-2xl border px-4 py-3 text-sm font-black"
            style={{ borderColor: 'var(--color-border)' }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={overLimit}
            className={`flex-1 rounded-2xl px-4 py-3 text-sm font-black text-neutral-950 transition ${
              overLimit
                ? 'cursor-not-allowed bg-zinc-700 text-zinc-500'
                : 'bg-lime-300 active:scale-[0.98]'
            }`}
          >
            Post anonymously
          </button>
        </div>
      </motion.div>
    </div>
  )
}
