import type { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  BellIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  FaceFrownIcon,
  HomeIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
} from '@heroicons/react/24/outline'

type AppShellProps = {
  children: ReactNode
  title: string
  subtitle: string
  onOpenComposer: () => void
  onToggleTheme: () => void
  theme: 'dark' | 'light'
  notificationBadge?: number
}

export function AppShell({ children, title, subtitle, onOpenComposer, onToggleTheme, theme, notificationBadge }: AppShellProps) {
  const location = useLocation()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-[10px] font-bold transition ${
      isActive
        ? 'bg-[var(--color-elevated)] text-lime-300'
        : 'text-[var(--color-text-subtle)] hover:text-[var(--color-text-muted)]'
    }`

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div
        className="mx-auto flex min-h-screen w-full max-w-md flex-col"
        style={{ background: 'var(--gradient-surface)' }}
      >
        <header
          className="sticky top-0 z-20 border-b px-4 py-3 backdrop-blur-xl"
          style={{ background: 'var(--color-header)', borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-lime-300 text-neutral-950 shadow-lg shadow-lime-300/20">
                <FaceFrownIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-xl font-black tracking-tight">
                  LinkedOut
                </h1>
                <p className="truncate text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {subtitle}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-2xl"
              style={{ background: 'var(--color-elevated)', border: '1px solid var(--color-border)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-4 w-4" style={{ color: 'var(--color-text-muted)' }} />
              ) : (
                <MoonIcon className="h-4 w-4" style={{ color: 'var(--color-text-muted)' }} />
              )}
            </button>
          </div>
          <div
            className="mt-3 flex items-center justify-between rounded-2xl px-3 py-2"
            style={{ background: 'var(--color-elevated)', border: '1px solid var(--color-border)' }}
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-black">{title}</p>
              <p className="truncate text-xs" style={{ color: 'var(--color-text-subtle)' }}>
                Anonymous social feed
              </p>
            </div>
            <span className="rounded-full bg-lime-300/15 px-3 py-1 text-[10px] font-bold text-lime-200">
              anonymous
            </span>
          </div>
        </header>

        <main key={location.pathname} className="flex-1 space-y-5 px-4 pb-28 pt-4">
          {children}
        </main>

        <nav
          className="fixed bottom-3 left-1/2 z-30 w-[calc(100%-1.5rem)] max-w-[24rem] -translate-x-1/2 rounded-[1.75rem] border px-2 pb-3 pt-3 shadow-2xl backdrop-blur-xl"
          style={{
            background: 'var(--color-header)',
            borderColor: 'var(--color-border)',
            boxShadow: '0 25px 50px -12px var(--color-shadow)',
          }}
        >
          <div
            className="grid grid-cols-[1fr_1fr_auto_1fr_1fr] items-end gap-1 text-xs font-bold"
            style={{ color: 'var(--color-text-subtle)' }}
          >
            <NavLink to="/feed" className={linkClass}>
              <HomeIcon className="h-5 w-5" />
              Feed
            </NavLink>

            <NavLink to="/jobs" className={linkClass}>
              <BriefcaseIcon className="h-5 w-5" />
              Jobs
            </NavLink>

            <button
              type="button"
              onClick={onOpenComposer}
              className="mb-1 flex h-14 w-14 items-center justify-center rounded-[1.3rem] bg-lime-300 text-neutral-950 shadow-[0_8px_24px_rgba(190,242,100,0.25)]"
              aria-label="Create post"
            >
              <PlusIcon className="h-7 w-7 stroke-[2.5]" />
            </button>

            <NavLink to="/messages" className={linkClass}>
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              Woes
            </NavLink>

            <NavLink to="/notifications" className={linkClass}>
              <div className="relative">
                <BellIcon className="h-5 w-5" />
                {notificationBadge !== undefined && notificationBadge > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-black text-white leading-none">
                    {notificationBadge > 9 ? '9+' : notificationBadge}
                  </span>
                )}
              </div>
              Alerts
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  )
}
