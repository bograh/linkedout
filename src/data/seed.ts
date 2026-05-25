import {
  ChatBubbleLeftRightIcon,
  FaceFrownIcon,
  FireIcon,
  InboxIcon,
  PencilSquareIcon,
  SparklesIcon,
  TrophyIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import type { Comment, MessageWithReplies, Post, Stat } from '../types'

export const seedPosts: Post[] = [
  {
    id: '1',
    name: 'Ama, Ghosted Since Tuesday',
    tag: 'Rejected but moisturized',
    time: '12m',
    icon: InboxIcon,
    text: 'Just received a rejection email for a job I forgot I applied to. Honestly, closure is closure.',
    reactions: 2400,
    comments: 318,
  },
  {
    id: '2',
    name: 'Kwesi, CV Version 19_Final_FINAL',
    tag: 'Open to suffering',
    time: '48m',
    icon: TrophyIcon,
    text: 'Entry-level role. Requirements: 8 years experience, PhD, ability to tame dragons, and proficiency in Excel. Salary: exposure.',
    reactions: 5800,
    comments: 902,
  },
  {
    id: '3',
    name: 'Nana, Interview Stage 7 Survivor',
    tag: 'Emotionally available to recruiters',
    time: '2h',
    icon: FaceFrownIcon,
    text: 'The recruiter said "we\'re like a family here" and suddenly I remembered I have boundaries.',
    reactions: 1100,
    comments: 221,
  },
]

export const seedComments: Record<string, Comment[]> = {
  '1': [
    {
      id: 'c1',
      name: 'GhostedMango402',
      text: 'Closure is a myth but I\'ll take what I can get.',
      time: '8m',
    },
    {
      id: 'c2',
      name: 'TiredTeapot567',
      text: 'The fact that you forgot says everything about this market.',
      time: '5m',
    },
  ],
  '2': [
    {
      id: 'c3',
      name: 'StillWaitingMicrowave123',
      text: 'I saw that same listing. They want a unicorn for exposure bucks.',
      time: '30m',
    },
  ],
}

export const stats: Stat[] = [
  { label: 'Posts today', value: 127, icon: PencilSquareIcon },
  { label: 'People venting', value: 43, icon: UsersIcon },
  { label: 'Replies sent', value: 89, icon: SparklesIcon },
]

export const seedMessages: MessageWithReplies[] = [
  {
    id: 'm1',
    name: 'Kojo',
    preview:
      'That rejection email looked auto-generated. You were better than that role anyway.',
    time: 'now',
    replies: [
      { name: 'You', text: 'I know right? At least they replied I guess...', time: 'now' },
    ],
  },
  {
    id: 'm2',
    name: 'Nana',
    preview: 'If you got a reply today, even a rejection, count that as movement.',
    time: '14m',
    replies: [],
  },
  {
    id: 'm3',
    name: 'Yaw',
    preview: 'That recruiter used "circle back" three times on one call.',
    time: '1h',
    replies: [],
  },
]

export const nameLeft = [
  'Ghosted', 'Muted', 'Tired', 'Hopeful', 'LateStage',
  'Inboxless', 'StillWaiting', 'BarelyOkay',
]

export const nameRight = [
  'Mango', 'Cactus', 'Otter', 'Pineapple', 'Traffic',
  'Spreadsheet', 'Teapot', 'Microwave',
]

export const tagPool = [
  'Open to sympathy',
  'Replying to silence',
  'Chronically refreshing',
  'Mildly unwell',
  'Still here somehow',
]

export const iconPool = [InboxIcon, FaceFrownIcon, SparklesIcon, FireIcon, ChatBubbleLeftRightIcon]
