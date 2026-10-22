"use client"

import { cinzel } from "@/lib/fonts"
import localFont from "next/font/local"
import Image from "next/image"
import { motion, useReducedMotion, type Variants } from "motion/react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { PlainBubbles } from "@/components/loader/PlainBubbles"
import { SectionBackdrop } from "@/components/section-backdrop"
import { TintedDeco } from "@/components/tinted-deco"
import { DecoCorners } from "@/components/deco-corners"

const theSeasons = localFont({
  src: "../../Font/Fontspring-DEMO-theseasons-reg.otf",
  display: "swap",
  variable: "--font-the-seasons",
})

const aboveTheBeyond = localFont({
  src: "../../Font/above-the-beyond-script.otf",
  display: "swap",
  variable: "--font-above-beyond",
})

const IVORY = "#fffaf4"
const entryEase = [0.22, 1, 0.36, 1] as const

const titleSize = "clamp(2.85rem, 13.5vw, 6.75rem)"
const photoTitleShadow =
  "0 1px 0 rgb(255 250 244 / 28%), 0 2px 18px rgb(42 34 28 / 55%), 0 12px 36px rgb(42 34 28 / 40%)"

// Plain background = same circle pattern as the gallery (PlainBubbles paints the base)
const plainBg = "var(--color-bg-pattern-base)"

// Text sitting directly on the background: deep slate title, slate-blue eyebrow / script,
// with a soft white edge (matches the gallery)
const onBgGlow = "0 1px 0 rgb(255 255 255 / 85%), 0 0 12px rgb(255 255 255 / 70%)"
const onBg = { color: "var(--color-welcome-navy)", textShadow: onBgGlow } as const
const onBgBlue = { color: "var(--color-welcome-heading)", textShadow: onBgGlow } as const
const onBgBody = { color: "var(--color-welcome-text)", textShadow: onBgGlow } as const

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}

const rise: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: entryEase } },
}

function DecoImg({ src, className }: { src: string; className: string }) {
  if (!src) return null
  return <TintedDeco src={src} className={className} />
}

// "!" and other symbols in Cinzel, letters in The Seasons
function SpecialCharFont({ text }: { text: string }) {
  return (
    <>
      {text.split(/([^\p{L}\s]+)/u).map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={`${cinzel.className} relative -top-[0.06em] inline-block font-normal tracking-normal`}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}

function PlainSeeYouThere({ background = true }: { background?: boolean }) {
  const siteConfig = useSiteConfig()
  const content = siteConfig.seeYouThere
  const plain = content.plain
  const reduceMotion = useReducedMotion()
  const { groomNickname, brideNickname } = siteConfig.couple
  const couple = `${groomNickname} & ${brideNickname}`
  const fill = (text: string) => text.split("{couple}").join(couple)

  return (
    <section
      id="see-you-there"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative isolate z-10 w-full overflow-hidden`}
      style={background ? { background: plainBg } : undefined}
    >
      {/* Same circle pattern as the gallery, with the light wash + double border
          (on the invitation page the shared wrapper paints these behind See You There and the footer) */}
      {background && <PlainBubbles />}
      {background && <SectionBackdrop />}
      {background && plain.showFrame && <div className="deco-frame" aria-hidden="true" />}

      {/* Corner florals (content/site.ts → seeYouThere.plain.decos) — top only; the footer continues below */}
      <DecoCorners decos={{ topLeft: plain.decos.topLeft, topRight: plain.decos.topRight }} />

      <motion.div
        className="relative z-20 mx-auto flex min-h-[78svh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center sm:min-h-[88svh] sm:py-28"
        variants={stagger}
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {plain.eyebrow ? (
          <motion.p
            variants={rise}
            className={`${cinzel.className} text-[0.65rem] font-semibold uppercase tracking-[0.3em] sm:text-xs`}
            style={onBgBlue}
          >
            {plain.eyebrow}
          </motion.p>
        ) : null}

        <motion.h2 variants={rise} className="relative mt-3 sm:mt-4">
          <span className="sr-only">
            {content.titleLine1} {content.titleLine2}
          </span>
          <span
            aria-hidden
            className={`${theSeasons.className} block uppercase leading-[0.88] tracking-[0.06em] sm:tracking-[0.08em]`}
            style={{ fontSize: titleSize, ...onBg }}
          >
            <SpecialCharFont text={content.titleLine1} />
            <br />
            <SpecialCharFont text={content.titleLine2} />
          </span>
        </motion.h2>

        {plain.script ? (
          <motion.p
            variants={rise}
            className={`${aboveTheBeyond.className} mt-3 text-[1.5rem] leading-tight sm:mt-4 sm:text-[2rem] md:text-[2.35rem]`}
            style={onBgBlue}
          >
            {fill(plain.script)}
          </motion.p>
        ) : null}

        <motion.div variants={rise} className="my-5 flex items-center justify-center gap-2 sm:my-6" aria-hidden>
          <span className="h-px w-12 sm:w-20" style={{ background: "linear-gradient(to right, transparent, var(--color-motif-medium))" }} />
          <span className="h-1.5 w-1.5 rotate-45" style={{ background: "var(--color-motif-accent)" }} />
          <span className="h-px w-12 sm:w-20" style={{ background: "linear-gradient(to left, transparent, var(--color-motif-medium))" }} />
        </motion.div>

        {plain.message ? (
          <motion.p
            variants={rise}
            className="font-goudy-italic mx-auto mt-4 max-w-md text-sm leading-relaxed sm:mt-5 sm:text-base"
            style={{ ...onBgBody, fontWeight: 600 }}
          >
            {fill(plain.message)}
          </motion.p>
        ) : null}

        {plain.decos.footerVine ? (
          <motion.div variants={rise} className="mt-7 sm:mt-9">
            <DecoImg src={plain.decos.footerVine} className="mx-auto block h-auto w-56 select-none opacity-90 sm:w-72 md:w-80" />
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  )
}

function PhotoSeeYouThere() {
  const siteConfig = useSiteConfig()
  const content = siteConfig.seeYouThere
  const { groomNickname, brideNickname } = siteConfig.couple
  const alt = content.photoAlt.split("{couple}").join(`${groomNickname} & ${brideNickname}`)
  const photo = encodeURI(content.photo)

  return (
    <section id="see-you-there" className={`${theSeasons.variable} relative isolate w-full overflow-hidden`}>
      <div className="relative min-h-[100svh] w-full">
        <Image src={photo} alt={alt} fill sizes="100vw" className="object-cover object-[center_42%] sm:object-[center_38%]" />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgb(20 16 12 / 38%) 0%, rgb(20 16 12 / 18%) 38%, rgb(20 16 12 / 12%) 58%, rgb(20 16 12 / 42%) 100%)",
          }}
          aria-hidden
        />

        <div className="absolute inset-0 flex items-center justify-center px-5 pb-[18vh] pt-16 sm:pb-[14vh]">
          <motion.h2
            className="relative text-center"
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.9, ease: entryEase }}
          >
            <span className="sr-only">
              {content.titleLine1} {content.titleLine2}
            </span>
            <span
              aria-hidden
              className={`${theSeasons.className} block uppercase leading-[0.88] tracking-[0.06em] sm:tracking-[0.08em]`}
              style={{ fontSize: titleSize, color: IVORY, textShadow: photoTitleShadow }}
            >
              <SpecialCharFont text={content.titleLine1} />
              <br />
              <SpecialCharFont text={content.titleLine2} />
            </span>
          </motion.h2>
        </div>
      </div>
    </section>
  )
}

// background: false when a parent already paints one continuous circle pattern
// behind this and the footer (see components/invitation-page.tsx)
export function SeeYouThere({ background = true }: { background?: boolean } = {}) {
  const siteConfig = useSiteConfig()
  const isPlain = siteConfig.loadingScreen?.display === "plain"
  return isPlain ? <PlainSeeYouThere background={background} /> : <PhotoSeeYouThere />
}
