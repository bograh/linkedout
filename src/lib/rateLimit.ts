import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis/cloudflare'

const redisUrl = import.meta.env.VITE_UPSTASH_REDIS_REST_URL
const redisToken = import.meta.env.VITE_UPSTASH_REDIS_REST_TOKEN

let ratelimit: Ratelimit | null = null

if (redisUrl && redisToken) {
  const redis = new Redis({ url: redisUrl, token: redisToken })
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '15 m'),
    analytics: true,
    prefix: 'linkedout',
  })
}

function getSessionId(): string {
  const key = 'linkedout_session_id'
  let id = localStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(key, id)
  }
  return id
}

export async function checkRateLimit(): Promise<{
  allowed: boolean
  remaining: number
  reset: number
}> {
  if (!ratelimit) {
    return { allowed: true, remaining: 999, reset: 0 }
  }
  const identifier = getSessionId()
  const { success, remaining, reset } = await ratelimit.limit(identifier)
  return { allowed: success, remaining, reset }
}
