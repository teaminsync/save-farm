"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  name: string
  text: string
  category: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoplaySpeed?: number
}

export default function TestimonialCarousel({
  testimonials,
  autoplaySpeed = 8000,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    startAutoplay()
    return () => autoplayRef.current && clearInterval(autoplayRef.current)
  }, [])

  const startAutoplay = () => {
    autoplayRef.current && clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, autoplaySpeed)
  }

  const pauseAutoplay = () => {
    autoplayRef.current && clearInterval(autoplayRef.current)
    autoplayRef.current = null
  }

  const resumeAutoplay = () => {
    if (!autoplayRef.current) startAutoplay()
  }

  const handlePrev = () => {
    pauseAutoplay()
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    pauseAutoplay()
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== 0) {
      const diff = touchStartX.current - e.touches[0].clientX
      if (Math.abs(diff) > 10) e.preventDefault()
    }
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === 0 || touchEndX.current === 0) return
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      diff > 0 ? handleNext() : handlePrev()
    }
    touchStartX.current = 0
    touchEndX.current = 0
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div
      className="relative max-w-5xl mx-auto px-8 md:px-12"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Arrows spaced outward */}
      <button
        className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 bg-warm-ivory/80 text-fern p-3 rounded-full opacity-70 hover:opacity-100 transition-opacity z-10"
        onClick={handlePrev}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        className="absolute -right-8 md:-right-12 top-1/2 -translate-y-1/2 bg-warm-ivory/80 text-fern p-3 rounded-full opacity-70 hover:opacity-100 transition-opacity z-10"
        onClick={handleNext}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="relative px-6 md:px-12">
            <div className="text-5xl text-fern/20 absolute -top-8 left-0">"</div>
            <p className="text-natural text-lg italic mb-6 leading-relaxed">{currentTestimonial.text}</p>
            <div className="text-5xl text-fern/20 absolute -bottom-8 right-0">"</div>
          </div>

          <div className="mt-8">
            <p className="text-fern font-medium">{currentTestimonial.name}</p>
            <p className="text-fern/80 text-sm mb-2">{currentTestimonial.category}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
