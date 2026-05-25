import type { Comment, MessageWithReplies, Post, Stat, Job, Notification } from '../types'

export const seedPosts: Post[] = [
  {
    id: '1',
    name: 'Ama, Ghosted Since Tuesday',
    tag: 'Rejected but moisturized',
    time: '12m',
    icon: 'InboxIcon',
    text: 'Just received a rejection email for a job I forgot I applied to. Honestly, closure is closure.',
    reactions: 2400,
    comments: 318,
  },
  {
    id: '2',
    name: 'Kwesi, CV Version 19_Final_FINAL',
    tag: 'Open to suffering',
    time: '48m',
    icon: 'TrophyIcon',
    text: 'Entry-level role. Requirements: 8 years experience, PhD, ability to tame dragons, and proficiency in Excel. Salary: exposure.',
    reactions: 5800,
    comments: 902,
  },
  {
    id: '3',
    name: 'Nana, Interview Stage 7 Survivor',
    tag: 'Emotionally available to recruiters',
    time: '2h',
    icon: 'FaceFrownIcon',
    text: 'The recruiter said "we\'re like a family here" and suddenly I remembered I have boundaries.',
    reactions: 1100,
    comments: 221,
  },
]

export const seedComments: Record<string, Comment[]> = {
  '1': [
    { id: 'c1', name: 'GhostedMango402', text: 'Closure is a myth but I\'ll take what I can get.', time: '8m' },
    { id: 'c2', name: 'TiredTeapot567', text: 'The fact that you forgot says everything about this market.', time: '5m' },
  ],
  '2': [
    { id: 'c3', name: 'StillWaitingMicrowave123', text: 'I saw that same listing. They want a unicorn for exposure bucks.', time: '30m' },
  ],
}

export const stats: Stat[] = [
  { label: 'Posts today', value: 127, icon: 'PencilSquareIcon' },
  { label: 'People venting', value: 43, icon: 'UsersIcon' },
  { label: 'Replies sent', value: 89, icon: 'SparklesIcon' },
]

export const seedMessages: MessageWithReplies[] = [
  {
    id: 'm1', name: 'Kojo',
    preview: 'That rejection email looked auto-generated. You were better than that role anyway.',
    time: 'now',
    replies: [{ name: 'You', text: 'I know right? At least they replied I guess...', time: 'now' }],
  },
  { id: 'm2', name: 'Nana', preview: 'If you got a reply today, even a rejection, count that as movement.', time: '14m', replies: [] },
  { id: 'm3', name: 'Yaw', preview: 'That recruiter used "circle back" three times on one call.', time: '1h', replies: [] },
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
  'Open to sympathy', 'Replying to silence', 'Chronically refreshing', 'Mildly unwell', 'Still here somehow',
]

export const iconPool = ['InboxIcon', 'FaceFrownIcon', 'SparklesIcon', 'FireIcon', 'ChatBubbleLeftRightIcon']

export const seedJobs: Job[] = [
  {
    id: 'j1', company: 'Startupify Inc.', title: 'Senior Excel Ninja (Unpaid)',
    salary: '0 — exposure',
    requirements: ['10+ years experience with pivot tables', 'Black belt in VLOOKUP', 'Willing to work for "culture"', 'Must provide your own laptop'],
    description: 'We\'re looking for a rockstar who lives and breathes spreadsheets.',
    applicants: 847, posted: '2h ago', urgent: true,
  },
  {
    id: 'j2', company: 'Synergy Corp', title: 'Chief Happiness Officer',
    salary: 'Free snacks',
    requirements: ['Must smile constantly', 'No experience necessary', 'Must bring your own happiness', 'Knowledge of "fun" required'],
    description: 'We need someone to stand by the coffee machine.',
    applicants: 231, posted: '5h ago', urgent: false,
  },
  {
    id: 'j3', company: 'DisruptCo', title: 'Professional Meeting Attender',
    salary: '$15/hr (capped at 10hrs/week)',
    requirements: ['Available 9-5 for meetings about meetings', 'Must say "circle back" at least 3x per meeting', 'Can type "noted" convincingly', 'No actual decision-making allowed'],
    description: 'You\'ll attend 8 hours of meetings daily and produce zero deliverables.',
    applicants: 156, posted: '1d ago', urgent: false,
  },
  {
    id: 'j4', company: 'Venture Capital Vibes', title: 'Junior Blockchain Evangelist',
    salary: 'Unpaid (equity: 0.0001%)',
    requirements: ['Must use "Web3" in every sentence', 'NFT collection preferred but not required', 'Hoodie mandatory'],
    description: 'We\'re disrupting the lemonade industry with blockchain technology.',
    applicants: 412, posted: '3d ago', urgent: false,
  },
  {
    id: 'j5', company: 'HR Nightmares Ltd', title: 'Talent Acquisition Specialist (Ghosting)',
    salary: 'Based on "vibes"',
    requirements: ['Must enjoy reading applications and never responding', 'Proficient in auto-generated rejection emails', 'Must use the phrase "we\'ll keep your resume on file"'],
    description: 'Do you love power? Join our HR team.',
    applicants: 89, posted: '4d ago', urgent: true,
  },
]

export const seedNotifications: Notification[] = [
  { id: 'n1', icon: 'ghost', text: '3 people ghosted you today. Classic.', time: '12m', read: false },
  { id: 'n2', icon: 'eye', text: 'A recruiter viewed your profile and kept scrolling.', time: '45m', read: false },
  { id: 'n3', icon: 'reject', text: 'You\'ve been rejected from a job you don\'t remember applying to.', time: '2h', read: false },
  { id: 'n4', icon: 'view', text: 'Your application was viewed. They immediately closed the tab.', time: '4h', read: false },
  { id: 'n5', icon: 'coffee', text: 'No interviews today. Have you considered becoming a barista?', time: '6h', read: true },
  { id: 'n6', icon: 'ghost', text: 'The recruiter who said "I\'ll call you next week" has entered witness protection.', time: '1d', read: true },
]
