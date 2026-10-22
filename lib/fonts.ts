import localFont from "next/font/local"

/**
 * Couple-name script from public/fonts/AnastasiaScript.ttf
 * (AnastasiaScript Regular.ttf is the same face).
 */
export const anastasiaScript = localFont({
  src: "../Font/AnastasiaScript.ttf",
  display: "swap",
  preload: true,
  variable: "--font-anastasia-script",
  weight: "400",
  style: "normal",
  adjustFontFallback: false,
})

// Google fonts, self-hosted (latin subset, files in /Font/google) so builds never depend
// on fetching Google Fonts — its CSS sometimes returns file URLs next/font can't parse.
// Variable files cover every weight the components ask for.

export const cinzel = localFont({
  src: "../Font/google/Cinzel-Variable.woff2",
  weight: "400 900",
  style: "normal",
  display: "swap",
  variable: "--font-cinzel",
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
})

export const playfairDisplay = localFont({
  src: [
    { path: "../Font/google/PlayfairDisplay-Variable.woff2", weight: "400 900", style: "normal" },
    { path: "../Font/google/PlayfairDisplay-Italic-Variable.woff2", weight: "400 900", style: "italic" },
  ],
  display: "swap",
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
})

export const cormorantGaramond = localFont({
  src: "../Font/google/CormorantGaramond-Variable.woff2",
  weight: "300 700",
  style: "normal",
  display: "swap",
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
})

export const inter = localFont({
  src: "../Font/google/Inter-Variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "Arial", "sans-serif"],
})

export const greatVibes = localFont({
  src: "../Font/google/GreatVibes-Regular.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-serif",
  fallback: ["cursive"],
})

export const imperialScript = localFont({
  src: "../Font/google/ImperialScript-Regular.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-imperial-script",
  fallback: ["cursive"],
})
