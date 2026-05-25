import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'outline'
  children: ReactNode
}

export function Button({
  children,
  variant = 'solid',
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-black transition active:scale-[0.98]'
  const styles =
    variant === 'outline'
      ? 'border border-neutral-950 bg-transparent text-neutral-950 hover:bg-neutral-950 hover:text-white'
      : 'bg-neutral-950 text-white hover:bg-neutral-800'

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  )
}
