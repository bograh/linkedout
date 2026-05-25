import {
  ChatBubbleLeftRightIcon,
  FaceFrownIcon,
  FireIcon,
  InboxIcon,
  SparklesIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline'
import type { ComponentType } from 'react'

type IconProps = {
  name: string
  className?: string
}

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  InboxIcon,
  FaceFrownIcon,
  SparklesIcon,
  FireIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon,
}

export function Icon({ name, className }: IconProps) {
  const Component = iconMap[name] ?? InboxIcon
  return <Component className={className} />
}
