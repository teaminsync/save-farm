import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import FloatingContactButton from "@/components/floating-contact-button"
import AudioControlButton from "@/components/audio-control-button"
import { AudioProvider } from "@/context/audio-context"
import CustomCursor from "@/components/custom-cursor"
import PerformanceOptimizer from "@/components/performance-optimizer"

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
    icon: '/favicon.ico',
    apple: '/favicon.ico',
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
        <link rel="preload" href="/images/hero-background.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/images/video-poster.png" as="image" />
        <link rel="preload" href="/images/save-farm-logo.svg" as="image" />

        {/* Preload key preview images */}
        <link rel="preload" href="/images/accommodations-hero.jpg" as="image" />
        <link rel="preload" href="/images/activities-hero.jpg" as="image" />
        <link rel="preload" href="/images/packages-hero.jpg" as="image" />
        <link rel="preload" href="/images/about-hero.jpg" as="image" />
        <link rel="preload" href="/images/tarpa-hero.jpg" as="image" />

        {/* Preload key preview images */}
        <link rel="preload" href="/images/accommodation-preview.jpg" as="image" />
        <link rel="preload" href="/images/activities-preview.jpg" as="image" />
        <link rel="preload" href="/images/packages-preview.jpg" as="image" />

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
            {children}
            <FloatingContactButton />
            <AudioControlButton />
            <CustomCursor />
            <Toaster />
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
