import type React from "react"
import type { Metadata } from "next"
import { siteConfig, canonicalSiteUrl } from "@/content/site"

// Link preview for /invitetwo: the reception-only date and venue (siteConfig.inviteTwo),
// not the main wedding date from app/layout.tsx
const { date, time, venue } = siteConfig.inviteTwo
const coupleNames = `${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname}`
const pageUrl = `${canonicalSiteUrl}/invitetwo`
const imageUrl = `${canonicalSiteUrl}${siteConfig.linkPreviewImage}`
// og:image:type must match the real file — Facebook / Messenger drop the image on a mismatch
const imageType = /\.png$/i.test(siteConfig.linkPreviewImage)
  ? "image/png"
  : /\.webp$/i.test(siteConfig.linkPreviewImage)
    ? "image/webp"
    : "image/jpeg"

const title = `${coupleNames} | ${date}`
const description = `Celebrate with ${coupleNames} on ${date}, ${time} at ${venue.name}, ${venue.address}. RSVP, discover their story and find all the details for the celebration.`

export const metadata: Metadata = {
  title: { absolute: `${coupleNames} - Wedding Celebration` },
  description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: `${coupleNames} Wedding`,
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
        width: 1200,
        height: 630,
        type: imageType,
        alt: `${coupleNames} Wedding Celebration - ${date}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [imageUrl],
  },
}

export default function InviteTwoLayout({ children }: { children: React.ReactNode }) {
  return children
}
