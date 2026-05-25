import { useState, useRef, type ReactNode, useCallback } from 'react'
import { motion } from 'framer-motion'

type PullToRefreshProps = {
  children: ReactNode
  onRefresh: () => void | Promise<void>
}

const THRESHOLD = 80

export function PullToRefresh({ children, onRefresh }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0)
  const [state, setState] = useState<'idle' | 'pulling' | 'refreshing'>('idle')
  const startY = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (containerRef.current && containerRef.current.scrollTop <= 0) {
      startY.current = e.touches[0].clientY
      setState('pulling')
    }
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (state !== 'pulling') return
    const currentY = e.touches[0].clientY
    const diff = currentY - startY.current
    const clamped = Math.min(Math.max(diff, 0), THRESHOLD * 1.5)
    setPullDistance(clamped)
  }, [state])

  const handleTouchEnd = useCallback(async () => {
    if (state !== 'pulling') return
    if (pullDistance >= THRESHOLD) {
      setState('refreshing')
      try {
        await onRefresh()
      } finally {
        setPullDistance(0)
        setState('idle')
      }
    } else {
      setPullDistance(0)
      setState('idle')
    }
  }, [state, pullDistance, onRefresh])

  const progress = Math.min(pullDistance / THRESHOLD, 1)
  const arrowRotation = progress * 180

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      <div
        className="flex justify-center overflow-hidden transition-all"
        style={{ height: state === 'refreshing' ? 48 : pullDistance * 0.5, opacity: Math.min(pullDistance / 40, 1) }}
      >
        <div className="flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--color-text-muted)' }}>
          {state === 'refreshing' ? (
            <>
              <motion.div
                className="h-4 w-4 rounded-full border-2 border-t-transparent"
                style={{ borderColor: 'var(--color-text-muted)', borderTopColor: 'transparent' }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              />
              Refreshing...
            </>
          ) : (
            <>
              <motion.span
                animate={{ rotate: arrowRotation }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="text-lg"
              >
                ↓
              </motion.span>
              {pullDistance >= THRESHOLD ? 'Release to refresh' : 'Pull to refresh'}
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
