import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import FloatingContactButton from "@/components/floating-contact-button"
import AudioControlButton from "@/components/audio-control-button"
import { AudioProvider } from "@/context/audio-context"
import CustomCursor from "@/components/custom-cursor"
import PerformanceOptimizer from "@/components/performance-optimizer"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Save Farm",
  description:
    "Experience serenity in the heart of nature at Save Farm, where modern comfort blends with sustainable living.",
  generator: "InSync Solutions",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />

        {/* Preload critical fonts */}
        <link rel="preload" href="/fonts/Serena.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Preload critical media with high priority */}
        <link
          rel="preload"
          href="https://res.cloudinary.com/ducsps1cw/video/upload/v1748522124/hero-background_sbg5xg.webm"
          as="video"
          type="video/webm"
        />
        <link
          rel="preload"
          href="https://res.cloudinary.com/ducsps1cw/image/upload/v1748524921/video-poster_def456.webp"
          as="image"
        />
        <link
          rel="preload"
          href="https://res.cloudinary.com/ducsps1cw/image/upload/v1748524921/save-farm-logo_lkrlkl.svg"
          as="image"
        />

        {/* Preload key hero images */}
        <link
          rel="preload"
          href="https://res.cloudinary.com/ducsps1cw/image/upload/v1748522040/accommodations-hero_s9wqox.webp"
          as="image"
        />
        <link
          rel="preload"
          href="https://res.cloudinary.com/ducsps1cw/image/upload/v1748548917/activities-hero_sy1i8s.webp"
          as="image"
        />
        <link
          rel="preload"
          href="https://res.cloudinary.com/ducsps1cw/image/upload/v1748550006/packages-hero_k5cdvs.webp"
          as="image"
        />
        <link
          rel="preload"
          href="https://res.cloudinary.com/ducsps1cw/image/upload/v1748550749/about-hero_irf1bj.webp"
          as="image"
        />
        <link
          rel="preload"
          href="https://res.cloudinary.com/ducsps1cw/image/upload/v1748550937/tarpa-hero_bs4r1m.webp"
          as="image"
        />

        {/* Preload key preview images */}
        <link
          rel="preload"
          href="https://res.cloudinary.com/ducsps1cw/image/upload/v1748525283/accommodation-preview_hbcfip.webp"
          as="image"
        />
        <link
          rel="preload"
          href="https://res.cloudinary.com/ducsps1cw/image/upload/v1748523519/activities-preview_w5igey.webp"
          as="image"
        />
        <link
          rel="preload"
          href="https://res.cloudinary.com/ducsps1cw/image/upload/v1748525135/packages-preview_fwhrek.webp"
          as="image"
        />

        {/* Load locomotive scroll CSS */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.css"
        />

        {/* Load Google fonts with display=swap */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Serena:wght@400;500;600;700&display=swap"
        />

        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body data-scroll-container className={`${montserrat.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AudioProvider>
            <PerformanceOptimizer />
            <Analytics />
            <Suspense fallback={null}>
              {children}
              <FloatingContactButton />
              <AudioControlButton />
              <CustomCursor />
              <Toaster />
            </Suspense>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
