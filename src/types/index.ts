export type Comment = {
  id: string
  name: string
  text: string
  time: string
}

export type Post = {
  id: string
  name: string
  tag: string
  time: string
  icon: string
  text: string
  reactions: number
  comments: number
}

export type Message = {
  id: string
  name: string
  preview: string
  time: string
}

export type MessageWithReplies = Message & {
  replies: { name: string; text: string; time: string }[]
}

export type Stat = {
  label: string
  value: number
  icon: string
}

export type Job = {
  id: string
  company: string
  title: string
  salary: string
  requirements: string[]
  description: string
  applicants: number
  posted: string
  urgent: boolean
}

export type Notification = {
  id: string
  icon: string
  text: string
  time: string
  read: boolean
}
