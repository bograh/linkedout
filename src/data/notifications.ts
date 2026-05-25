import type { Notification } from '../types'

export const seedNotifications: Notification[] = [
  {
    id: 'n1',
    icon: 'ghost',
    text: '3 people ghosted you today. Classic.',
    time: '12m',
    read: false,
  },
  {
    id: 'n2',
    icon: 'eye',
    text: 'A recruiter viewed your profile and kept scrolling.',
    time: '45m',
    read: false,
  },
  {
    id: 'n3',
    icon: 'reject',
    text: 'You\'ve been rejected from a job you don\'t remember applying to.',
    time: '2h',
    read: false,
  },
  {
    id: 'n4',
    icon: 'view',
    text: 'Your application was viewed. They immediately closed the tab.',
    time: '4h',
    read: false,
  },
  {
    id: 'n5',
    icon: 'coffee',
    text: 'No interviews today. Have you considered becoming a barista?',
    time: '6h',
    read: true,
  },
  {
    id: 'n6',
    icon: 'ghost',
    text: 'The recruiter who said "I\'ll call you next week" has entered witness protection.',
    time: '1d',
    read: true,
  },
]
