import { motion } from 'framer-motion'

type SkeletonProps = {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

export function Skeleton({ className = '', variant = 'text', width, height }: SkeletonProps) {
  return (
    <motion.div
      className={`animate-pulse ${variant === 'circular' ? 'rounded-full' : variant === 'rectangular' ? 'rounded-2xl' : 'rounded-md'} ${className}`}
      style={{
        width: width ?? (variant === 'circular' ? undefined : '100%'),
        height: height ?? (variant === 'text' ? 14 : undefined),
        background: 'var(--color-elevated)',
      }}
      animate={{ opacity: [1, 0.4, 1] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
    />
  )
}

export function PostCardSkeleton() {
  return (
    <div className="theme-elevated rounded-[1.75rem] border p-4" style={{ borderColor: 'var(--color-border)' }}>
      <div className="mb-4 flex gap-3">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2 pt-1">
          <Skeleton width="40%" />
          <Skeleton width="25%" />
        </div>
      </div>
      <div className="mb-4 space-y-2">
        <Skeleton />
        <Skeleton width="80%" />
      </div>
      <div className="flex items-center justify-between border-t pt-3" style={{ borderColor: 'var(--color-border)' }}>
        <Skeleton width="25%" />
        <Skeleton width="30%" />
        <Skeleton width="15%" />
      </div>
    </div>
  )
}

export function JobCardSkeleton() {
  return (
    <div className="theme-elevated rounded-[1.75rem] border p-4" style={{ borderColor: 'var(--color-border)' }}>
      <div className="mb-3 space-y-2">
        <Skeleton width="60%" height={20} />
        <Skeleton width="35%" />
      </div>
      <div className="mb-3 space-y-2">
        <Skeleton width="30%" height={16} />
        <Skeleton />
        <Skeleton width="70%" />
      </div>
      <div className="flex items-center justify-between border-t pt-3" style={{ borderColor: 'var(--color-border)' }}>
        <Skeleton width="40%" />
        <Skeleton width="35%" height={32} variant="rectangular" />
      </div>
    </div>
  )
}

export function MessageCardSkeleton() {
  return (
    <div className="theme-elevated rounded-[1.75rem] border p-4" style={{ borderColor: 'var(--color-border)' }}>
      <div className="flex items-start gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2 pt-1">
          <Skeleton width="30%" />
          <Skeleton width="70%" />
        </div>
        <Skeleton width="15%" />
      </div>
    </div>
  )
}

export function NotificationSkeleton() {
  return (
    <div className="theme-elevated rounded-[1.75rem] border p-4" style={{ borderColor: 'var(--color-border)' }}>
      <div className="flex items-start gap-3">
        <Skeleton variant="circular" width={36} height={36} />
        <div className="flex-1 space-y-2 pt-1">
          <Skeleton width="85%" />
          <Skeleton width="30%" />
        </div>
      </div>
    </div>
  )
}
