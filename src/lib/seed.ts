import { supabase } from './supabase'
import { seedPosts, seedMessages, seedJobs, seedNotifications } from '../data/seed'

let seeded = false

export async function seedIfEmpty() {
  if (!supabase || seeded) return
  seeded = true

  const { data: existing } = await supabase.from('posts').select('id').limit(1)
  if (existing && existing.length > 0) return

  console.log('[LinkedOut] Seeding Supabase database...')

  await supabase.from('posts').insert(
    seedPosts.map((p) => ({
      name: p.name, tag: p.tag, time: p.time, icon: p.icon, text: p.text,
      reactions: p.reactions, comments_count: p.comments,
    })),
  )

  await supabase.from('messages').insert(
    seedMessages.map((m) => ({ name: m.name, preview: m.preview, time: m.time })),
  )

  await supabase.from('jobs').insert(
    seedJobs.map((j) => ({
      company: j.company, title: j.title, salary: j.salary,
      requirements: j.requirements, description: j.description,
      applicants: j.applicants, posted: j.posted, urgent: j.urgent,
    })),
  )

  await supabase.from('notifications').insert(
    seedNotifications.map((n) => ({ icon: n.icon, text: n.text, time: n.time, read: n.read })),
  )

  const { data: msgRows } = await supabase.from('messages').select('id, name')
  for (const msg of seedMessages) {
    if (msg.replies.length > 0) {
      const row = msgRows?.find((r) => r.name === msg.name)
      if (row) {
        await supabase.from('message_replies').insert(
          msg.replies.map((r) => ({ message_id: row.id, name: r.name, text: r.text, time: r.time })),
        )
      }
    }
  }

  console.log('[LinkedOut] Database seeded successfully')
}
