import { motion } from 'framer-motion'
import { SparklesIcon } from '@heroicons/react/24/outline'
import type { Stat } from '../types'

type DigestCardProps = {
  stats: Stat[]
  postCount: number
}

function todaySeed() {
  const d = new Date()
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()
}

const roastPool = [
  'Brutal out there. Absolutely brutal.',
  'Have you considered a career in mime?',
  'The market is tough. So is rejection. You\'re both.',
  'Remember: every "no" is one step closer to a "lol no".',
  'Your CV has been viewed 0 times today. Proud of you.',
  'Ghosting is at an all-time high. You\'re part of history.',
  'Today\'s job market: a dumpster fire with a "hiring" sign.',
]

export function DigestCard({ stats, postCount }: DigestCardProps) {
  const seed = todaySeed()
  const roast = roastPool[seed % roastPool.length]
  const totalApplicants = stats.find((s) => s.label === 'Posts today')?.value ?? 0

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-[2rem] border border-violet-300/20 bg-violet-300 p-5 text-neutral-950 shadow-2xl shadow-violet-300/10"
    >
      <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 inline-flex rounded-full bg-neutral-950 px-3 py-1 text-xs font-bold text-violet-200">
            Today in Job Search
          </p>
          <h2 className="text-3xl font-black leading-tight">
            The daily digest.
          </h2>
        </div>
        <span className="mt-1 shrink-0 text-4xl" aria-hidden="true">
          <SparklesIcon className="h-10 w-10" />
        </span>
      </div>

      <p className="text-sm font-medium text-neutral-800 italic">
        "{roast}"
      </p>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-neutral-950/10 p-4">
          <p className="text-lg font-black">{postCount}</p>
          <p className="text-[11px] leading-tight text-neutral-700">rants today</p>
        </div>
        <div className="rounded-2xl bg-neutral-950/10 p-4">
          <p className="text-lg font-black">{totalApplicants}</p>
          <p className="text-[11px] leading-tight text-neutral-700">ghosted</p>
        </div>
        <div className="rounded-2xl bg-neutral-950/10 p-4">
          <p className="text-lg font-black">{Math.floor(seed % 47 + 12)}%</p>
          <p className="text-[11px] leading-tight text-neutral-700">hope left</p>
        </div>
      </div>
      </div>
    </motion.section>
  )
}
