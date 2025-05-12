"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
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
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

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
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
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

  const handlePrev = () => {
    pauseAutoplay()
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    pauseAutoplay()
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
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
      >
        <div className="relative h-80 w-full">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 cursor-default"
            >
              <Image
                src={imageSrc || "/placeholder.svg"}
                alt={currentImage?.alt || "Gallery image"}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-warm-ivory/80 text-fern p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity z-10"
          onClick={(e) => {
            e.stopPropagation()
            handlePrev()
          }}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-warm-ivory/80 text-fern p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity z-10"
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
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
