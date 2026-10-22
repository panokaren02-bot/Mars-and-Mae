import type { CSSProperties } from "react"
import { inter } from "@/lib/fonts"

const EMOJI_FONT_FAMILY =
  '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif'

/**
 * Characters that must not use wedding display/serif fonts (emoji, apostrophes, etc.).
 */
const SPECIAL_CHAR_RUN =
  /(\p{Extended_Pictographic}+|'|'|’|‘|`|´|"|"|"|«|»|!|\?|…|–|—|&)/gu

function splitTextAndSpecial(text: string) {
  const segments: Array<{ kind: "text" | "special"; value: string }> = []
  let lastIndex = 0
  for (const match of text.matchAll(SPECIAL_CHAR_RUN)) {
    const index = match.index ?? 0
    if (index > lastIndex) {
      segments.push({ kind: "text", value: text.slice(lastIndex, index) })
    }
    segments.push({ kind: "special", value: match[0] })
    lastIndex = index + match[0].length
  }
  if (lastIndex < text.length) {
    segments.push({ kind: "text", value: text.slice(lastIndex) })
  }
  return segments.length > 0 ? segments : [{ kind: "text" as const, value: text }]
}

export const proposalSpecialCharStyle: CSSProperties = {
  fontFamily: `${EMOJI_FONT_FAMILY}, ${inter.style.fontFamily}, ui-sans-serif, system-ui, sans-serif`,
  fontStyle: "normal",
  fontWeight: 400,
  letterSpacing: "normal",
}

const defaultSpecialClassName = `${inter.className} mx-0.5 inline-block align-middle text-[1.05em] leading-none font-normal not-italic tracking-normal`

export function ProposalMixedText({
  text,
  className = "",
  specialClassName = defaultSpecialClassName,
}: {
  text: string
  className?: string
  specialClassName?: string
}) {
  const segments = splitTextAndSpecial(text)
  return (
    <span className={className}>
      {segments.map((segment, index) =>
        segment.kind === "special" ? (
          <span
            key={index}
            className={specialClassName}
            style={proposalSpecialCharStyle}
            aria-hidden={false}
          >
            {segment.value}
          </span>
        ) : (
          <span key={index}>{segment.value}</span>
        )
      )}
    </span>
  )
}

/** Multiline preview (e.g. invite modal) with per-line emoji handling. */
export function ProposalMixedTextBlock({
  text,
  className = "",
  lineClassName = "",
}: {
  text: string
  className?: string
  lineClassName?: string
}) {
  const lines = text.split("\n")
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <span key={index} className={`block ${lineClassName}`}>
          {line.length > 0 ? (
            <ProposalMixedText text={line} />
          ) : (
            "\u00A0"
          )}
        </span>
      ))}
    </div>
  )
}

export { inter as proposalMixedTextInter }
