const HASHTAG_RE = /#(\w+)/g

export type TextSegment =
  | { type: 'text'; value: string }
  | { type: 'hashtag'; value: string }

export function parseHashtags(text: string): TextSegment[] {
  const segments: TextSegment[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  HASHTAG_RE.lastIndex = 0

  while ((match = HASHTAG_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', value: text.slice(lastIndex, match.index) })
    }
    segments.push({ type: 'hashtag', value: match[1] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', value: text.slice(lastIndex) })
  }

  return segments.length > 0 ? segments : [{ type: 'text', value: text }]
}

export function extractHashtags(text: string): string[] {
  const tags: string[] = []
  let match: RegExpExecArray | null
  HASHTAG_RE.lastIndex = 0
  while ((match = HASHTAG_RE.exec(text)) !== null) {
    if (!tags.includes(match[1])) {
      tags.push(match[1])
    }
  }
  return tags
}
