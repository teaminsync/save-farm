"use client"

import { useEffect } from "react"

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical images when component mounts
    const criticalImages = [
      "https://res.cloudinary.com/ducsps1cw/video/upload/v1748522124/hero-background_sbg5xg.webm",
      "https://res.cloudinary.com/ducsps1cw/image/upload/v1748524921/video-poster_def456.webp",
      "https://res.cloudinary.com/ducsps1cw/image/upload/v1748524921/save-farm-logo_lkrlkl.svg",
      "https://res.cloudinary.com/ducsps1cw/image/upload/v1748525283/accommodation-preview_hbcfip.webp",
      "https://res.cloudinary.com/ducsps1cw/image/upload/v1748523519/activities-preview_w5igey.webp",
      "https://res.cloudinary.com/ducsps1cw/image/upload/v1748525135/packages-preview_fwhrek.webp",
    ]

    const preloadImage = (src: string) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = src.endsWith(".webm") ? "video" : "image"
      link.href = src
      document.head.appendChild(link)
    }

    criticalImages.forEach(preloadImage)

    // Optimize video loading
    const videos = document.querySelectorAll("video")
    videos.forEach((video) => {
      video.preload = "auto"
      video.load()
    })

    // Add intersection observer for lazy loading non-critical images
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.removeAttribute("data-src")
              imageObserver.unobserve(img)
            }
          }
        })
      },
      { rootMargin: "50px" },
    )

    // Observe all images with data-src attribute
    const lazyImages = document.querySelectorAll("img[data-src]")
    lazyImages.forEach((img) => imageObserver.observe(img))

    return () => {
      imageObserver.disconnect()
    }
  }, [])

  return null
}
