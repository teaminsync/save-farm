"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import NextImage from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageGalleryProps {
  images: {
    src: string
    alt: string
  }[]
  autoplaySpeed?: number
}

export default function ImageGallery({ images, autoplaySpeed = 5000 }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({})
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((image) => {
        return new Promise<void>((resolve) => {
          if (!image.src || image.src.trim() === "") {
            resolve()
            return
          }

          const img = new window.Image()
          img.src = image.src
          img.crossOrigin = "anonymous"
          img.onload = () => {
            setImagesLoaded((prev) => ({
              ...prev,
              [image.src]: true,
            }))
            resolve()
          }
          img.onerror = () => {
            resolve()
          }
        })
      })

      await Promise.all(imagePromises)
    }

    preloadImages()
  }, [images])

  useEffect(() => {
    // Start autoplay
    startAutoplay()

    return () => {
      // Clean up autoplay on unmount
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [])

  const startAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }

    autoplayRef.current = setInterval(() => {
      goToNextSlide()
    }, autoplaySpeed)
  }

  const pauseAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }

  const resumeAutoplay = () => {
    if (!autoplayRef.current) {
      startAutoplay()
    }
  }

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrev = () => {
    pauseAutoplay()
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    pauseAutoplay()
    goToNextSlide()
  }

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    // If we've started a horizontal swipe, prevent default to avoid page scrolling
    if (touchStartX.current !== 0) {
      const currentX = e.touches[0].clientX
      const diff = touchStartX.current - currentX

      // If horizontal movement is significant, prevent default
      if (Math.abs(diff) > 10) {
        e.preventDefault()
      }
    }

    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    // Only process if we have both start and end values
    if (touchStartX.current === 0 || touchEndX.current === 0) {
      return
    }

    const diff = touchStartX.current - touchEndX.current

    // If the difference is significant enough to be considered a swipe
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, go to next
        handleNext()
      } else {
        // Swipe right, go to prev
        handlePrev()
      }
    }

    // Reset touch values after processing
    touchStartX.current = 0
    touchEndX.current = 0
  }

  const handleTouchCancel = () => {
    touchStartX.current = 0
    touchEndX.current = 0
  }

  // Ensure we have valid images to display
  if (!images || images.length === 0) {
    return (
      <div className="relative rounded-lg overflow-hidden bg-fern/10 h-80 flex items-center justify-center">
        <p className="text-natural">No images available</p>
      </div>
    )
  }

  // Use a placeholder image if the current image source is empty or invalid
  const placeholderImage = "/placeholder.svg?height=320&width=480"
  const currentImage = images[currentIndex]
  const imageSrc = currentImage?.src && currentImage.src.trim() !== "" ? currentImage.src : placeholderImage

  return (
    <>
      <div
        className="relative rounded-lg overflow-hidden"
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      >
        <div className="relative h-[320px] md:h-80 w-full">
          {/* Display all images but only show the current one */}
          {images.map((image, index) => {
            const src = image?.src && image.src.trim() !== "" ? image.src : placeholderImage
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <NextImage
                  src={src || "/placeholder.svg"}
                  alt={image?.alt || "Gallery image"}
                  fill
                  className="object-cover"
                  priority={index === currentIndex || index === (currentIndex + 1) % images.length}
                />
              </div>
            )
          })}
        </div>

        {/* Navigation arrows */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-warm-ivory/80 text-fern p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity z-20"
          onClick={(e) => {
            e.stopPropagation()
            handlePrev()
          }}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-warm-ivory/80 text-fern p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity z-20"
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-warm-ivory w-4" : "bg-warm-ivory/60"
              }`}
              onClick={(e) => {
                e.stopPropagation()
                pauseAutoplay()
                setCurrentIndex(index)
              }}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  )
}
