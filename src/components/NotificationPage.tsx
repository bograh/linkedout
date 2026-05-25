import { motion } from 'framer-motion'
import {
  BellIcon,
  EyeIcon,
  FaceFrownIcon,
  HandRaisedIcon,
  NoSymbolIcon,
} from '@heroicons/react/24/outline'
import type { Notification } from '../types'
import { AppShell } from './AppShell'
import { NotificationSkeleton } from './Skeleton'

const iconMap: Record<Notification['icon'], typeof BellIcon> = {
  ghost: FaceFrownIcon,
  eye: EyeIcon,
  reject: NoSymbolIcon,
  view: EyeIcon,
  coffee: HandRaisedIcon,
}

type NotificationPageProps = {
  notifications: Notification[]
  unreadCount: number
  loading?: boolean
  onOpenComposer: () => void
  onMarkAllRead: () => void
  onToggleTheme: () => void
  theme: 'dark' | 'light'
}

export function NotificationPage({
  notifications,
  unreadCount,
  loading,
  onOpenComposer,
  onMarkAllRead,
  onToggleTheme,
  theme,
}: NotificationPageProps) {
  return (
    <AppShell
      title="Notifications"
      subtitle="All the bad news in one place."
      onOpenComposer={onOpenComposer}
      onToggleTheme={onToggleTheme}
      theme={theme}
    >
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[2rem] border border-red-300/20 bg-red-300 p-5 text-neutral-950 shadow-2xl shadow-red-300/10"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex rounded-full bg-neutral-950 px-3 py-1 text-xs font-bold text-red-200">
              Activity
            </p>
            <h2 className="text-3xl font-black leading-tight">
              Your daily dose of disappointment.
            </h2>
          </div>
          <span className="mt-1 shrink-0 text-4xl" aria-hidden="true">
            <BellIcon className="h-10 w-10" />
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-neutral-800">
            {unreadCount > 0
              ? `You have ${unreadCount} new notification${unreadCount > 1 ? 's' : ''}`
              : 'You\'re all caught up. For now.'}
          </p>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllRead}
              className="rounded-xl bg-neutral-950 px-3 py-1.5 text-xs font-bold text-red-200"
            >
              Mark all read
            </button>
          )}
        </div>
      </motion.section>

      <section className="space-y-3">
        {loading ? (
          <>
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
          </>
        ) : (
          <>
        {notifications.length === 0 && (
          <p
            className="rounded-[1.75rem] border p-4 text-center text-sm"
            style={{ background: 'var(--color-empty-bg)', borderColor: 'var(--color-empty-border)', color: 'var(--color-empty-text)' }}
          >
            No notifications yet. Check back after your next rejection.
          </p>
        )}
        {notifications.map((notif, index) => {
          const Icon = iconMap[notif.icon]
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className={`flex items-start gap-3 rounded-[1.75rem] border p-4 ${
                notif.read ? 'border-white/5 bg-white/[0.02]' : ''
              }`}
              style={
                notif.read
                  ? { borderColor: 'color-mix(in srgb, var(--color-border) 50%, transparent)', background: 'color-mix(in srgb, var(--color-elevated) 50%, transparent)' }
                  : { borderColor: 'var(--color-border)', background: 'var(--color-elevated)' }
              }
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl ${
                  notif.read ? 'theme-icon-bg' : 'bg-red-500/20'
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${notif.read ? 'text-zinc-500' : 'text-red-300'}`}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm leading-relaxed ${
                    notif.read ? '' : ''
                  }`}
                  style={{ color: notif.read ? 'var(--color-text-subtle)' : 'var(--color-text-secondary)' }}
                >
                  {notif.text}
                </p>
                <p className="mt-1 text-xs" style={{ color: 'var(--color-text-subtle)' }}>{notif.time}</p>
              </div>
              {!notif.read && (
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
              )}
            </motion.div>
          )
        })}
          </>
        )}
      </section>
    </AppShell>
  )
}
