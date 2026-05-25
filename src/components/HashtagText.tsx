import { parseHashtags } from '../utils/hashtags'

type HashtagTextProps = {
  text: string
  onHashtagClick: (tag: string) => void
}

export function HashtagText({ text, onHashtagClick }: HashtagTextProps) {
  const segments = parseHashtags(text)

  return (
    <>
      {segments.map((seg, i) =>
        seg.type === 'hashtag' ? (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onHashtagClick(seg.value)
            }}
            className="font-bold text-lime-300 hover:text-lime-200"
          >
            #{seg.value}
          </button>
        ) : (
          <span key={i}>{seg.value}</span>
        ),
      )}
    </>
  )
}
