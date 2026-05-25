# LinkedOut

Satirical social network for unemployed people. Anonymous posts, "same bro" reactions, absurd job listings, and premium ghosting satire.

Built with **React 19** + **TypeScript 6** + **Vite 8** + **Tailwind CSS 4** + **Framer Motion 12** + **Supabase**.

## Getting Started

```bash
pnpm install
pnpm run dev
```

## Environment Variables

Copy `.env` from the template:

| Variable | Required | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | No* | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | No* | Supabase anonymous key |
| `VITE_UPSTASH_REDIS_REST_URL` | No | Upstash Redis REST URL |
| `VITE_UPSTASH_REDIS_REST_TOKEN` | No | Upstash Redis REST token |

*\*Without Supabase, the app falls back to localStorage + seed data.*

### Rate Limiting (Upstash)

Rate limits post creation to 10 posts per 15 minutes per browser session.

```bash
VITE_UPSTASH_REDIS_REST_URL=https://<region>.upstash.io
VITE_UPSTASH_REDIS_REST_TOKEN=<token>
```

## Scripts

| Command | Description |
|---|---|
| `pnpm run dev` | Start Vite dev server |
| `pnpm run build` | TypeScript check + production build |
| `pnpm run lint` | Run ESLint |
| `pnpm run preview` | Preview production build |

## Architecture

### Data Flow

- **Dual mode**: If Supabase env vars are present, the app reads/writes to Supabase. Otherwise it falls back to localStorage with seed data for local development.
- **Pagination**: On Supabase, all post IDs are fetched on mount (lightweight), shuffled client-side, then full post data is fetched in pages of 10 via infinite scroll.
- **Optimistic updates**: All mutations update local state immediately before writing to Supabase.

### Project Structure

```
src/
├── components/       UI components (pages, cards, modals, skeletons)
├── hooks/            Dual-mode data hooks (posts, messages, jobs, notifications, stats, theme)
├── lib/              Supabase client, Upstash rate limit, seed
├── data/             Seed data for offline development
├── types/            TypeScript interfaces
├── utils/            Helpers (hashtags, format)
```

### Key Hooks

| Hook | Source | Features |
|---|---|---|
| `usePosts` | Supabase / localStorage | Infinite scroll, random shuffle, hashtag search, rate-limited posting |
| `useMessages` | Supabase / localStorage | Message threads with replies |
| `useJobs` | Supabase / localStorage | Satirical job listings with applicant tracking |
| `useNotifications` | Supabase / localStorage | Read/unread state, mark all read |
| `useStats` | Supabase / localStorage | Live counters (posts, venting, replies) |

## Supabase Schema

Tables: `posts`, `comments`, `messages`, `message_replies`, `jobs`, `notifications`

All tables use open RLS policies (no auth — fully anonymous). Migration files in `supabase/migrations/`.

## Features

- Anonymous posts with auto-generated usernames
- Random post order (different per visitor)
- Infinite scroll with chunked loading
- Hashtag parsing and server-side filtered search
- Pull-to-refresh (re-fetches and re-shuffles)
- Dark / light theme with persistent CSS custom properties
- Loading skeletons during Supabase fetches
- Route-level code splitting (`React.lazy`)
- Post reactions ("same bro"), comments ("condolences"), share via Web Share API
- Rate limited posting (Upstash, 10/15min)
- Daily digest card with rotating roasts
