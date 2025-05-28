"use client"

import { useEffect } from 'react'

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical images when component mounts
    const criticalImages = [
      '/images/hero-background.mp4',
      '/images/video-poster.png',
      '/images/save-farm-logo.svg',
      '/images/accommodation-preview.jpg',
      '/images/activities-preview.jpg',
      '/images/packages-preview.jpg',
    ]

    const preloadImage = (src: string) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = src.endsWith('.mp4') ? 'video' : 'image'
      link.href = src
      document.head.appendChild(link)
    }

    criticalImages.forEach(preloadImage)

    // Optimize video loading
    const videos = document.querySelectorAll('video')
    videos.forEach((video) => {
      video.preload = 'auto'
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
              img.removeAttribute('data-src')
              imageObserver.unobserve(img)
            }
          }
        })
      },
      { rootMargin: '50px' }
    )

    // Observe all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]')
    lazyImages.forEach((img) => imageObserver.observe(img))

    return () => {
      imageObserver.disconnect()
    }
  }, [])

  return null
}