"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import NextImage from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ImageGalleryProps {
  images: {
    src: string
    alt: string
  }[]
  autoplaySpeed?: number
}

export default function ImageGallery({ images, autoplaySpeed = 5000 }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({})
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const savedScrollPosition = useRef(0)
  const locomotiveScrollInstance = useRef<any>(null)

  // Client-side only
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

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

  // Start autoplay
  useEffect(() => {
    startAutoplay()
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [])

  // Find and store the locomotive scroll instance
  useEffect(() => {
    // Try to find the locomotive scroll instance
    const findLocomotiveScroll = () => {
      // Look for the locomotive-scroll element
      const scrollEl = document.querySelector("[data-scroll-container]")
      if (scrollEl && (scrollEl as any).__locomotiveScroll) {
        locomotiveScrollInstance.current = (scrollEl as any).__locomotiveScroll
      }
    }

    findLocomotiveScroll()
  }, [])

  // Handle fullscreen state changes
  useEffect(() => {
    if (isFullscreen) {
      pauseAutoplay()
      lockScroll()
    } else {
      resumeAutoplay()
      unlockScroll()
    }

    // Add event listener for escape key
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    // Add event listeners for keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return

      if (e.key === "ArrowLeft") {
        handlePrev()
      } else if (e.key === "ArrowRight") {
        handleNext()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleEscKey)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isFullscreen])

  // Custom event to close all galleries
  useEffect(() => {
    const handleCloseAllGalleries = () => {
      if (isFullscreen) {
        setIsFullscreen(false)
      }
    }

    window.addEventListener("closeAllImageGalleries", handleCloseAllGalleries)
    return () => {
      window.removeEventListener("closeAllImageGalleries", handleCloseAllGalleries)
    }
  }, [isFullscreen])

  // Aggressive scroll locking
  const lockScroll = useCallback(() => {
    // Save current scroll position
    savedScrollPosition.current = window.scrollY

    // Disable locomotive scroll if it exists
    if (locomotiveScrollInstance.current) {
      locomotiveScrollInstance.current.stop()
    }

    // Apply styles to prevent scrolling on html and body
    document.documentElement.style.overflow = "hidden"
    document.documentElement.style.height = "100%"
    document.body.style.overflow = "hidden"
    document.body.style.height = "100%"
    document.body.style.touchAction = "none"
    document.body.style.position = "fixed"
    document.body.style.top = `-${savedScrollPosition.current}px`
    document.body.style.width = "100%"

    // Prevent wheel events
    window.addEventListener("wheel", preventDefaultScroll, { passive: false })
    // Prevent touchmove events
    window.addEventListener("touchmove", preventDefaultScroll, { passive: false })
  }, [])

  const unlockScroll = useCallback(() => {
    // Re-enable locomotive scroll if it exists
    if (locomotiveScrollInstance.current) {
      locomotiveScrollInstance.current.start()
    }

    // Remove styles that prevent scrolling
    document.documentElement.style.overflow = ""
    document.documentElement.style.height = ""
    document.body.style.overflow = ""
    document.body.style.height = ""
    document.body.style.touchAction = ""
    document.body.style.position = ""
    document.body.style.top = ""
    document.body.style.width = ""

    // Restore scroll position
    window.scrollTo(0, savedScrollPosition.current)

    // Remove event listeners
    window.removeEventListener("wheel", preventDefaultScroll)
    window.removeEventListener("touchmove", preventDefaultScroll)
  }, [])

  const preventDefaultScroll = useCallback((e: Event) => {
    e.preventDefault()
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
    if (!autoplayRef.current && !isFullscreen) {
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

  const toggleFullscreen = () => {
    // Close any other open modals first by dispatching a custom event
    if (!isFullscreen) {
      const closeEvent = new CustomEvent("closeAllImageGalleries")
      window.dispatchEvent(closeEvent)
    }
    setIsFullscreen(!isFullscreen)
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
        className="relative rounded-lg overflow-hidden cursor-pointer"
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        onClick={toggleFullscreen}
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
                  priority={index === currentIndex}
                  loading={index === currentIndex ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={80}
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

      {/* Fullscreen Modal - Using createPortal to render directly to body */}
      {isMounted &&
        isFullscreen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/95 z-[99999]"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
            onClick={() => setIsFullscreen(false)}
          >
            <button
              className="absolute top-4 right-4 bg-warm-ivory/90 text-fern p-3 rounded-full z-[100000] hover:bg-warm-ivory transition-colors"
              onClick={() => setIsFullscreen(false)}
              aria-label="Close enlarged view"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative max-w-5xl w-[95%] mx-auto" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-video w-full">
                <NextImage
                  src={imageSrc || "/placeholder.svg"}
                  alt={currentImage?.alt || "Gallery image"}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={90}
                  priority
                />
              </div>

              {/* Modal navigation arrows */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-warm-ivory/90 text-fern p-2 md:p-3 rounded-full opacity-90 hover:opacity-100 transition-opacity z-20"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrev()
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
              </button>

              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-warm-ivory/90 text-fern p-2 md:p-3 rounded-full opacity-90 hover:opacity-100 transition-opacity z-20"
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
              </button>

              {/* Modal dots indicator */}
              <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-warm-ivory scale-125" : "bg-warm-ivory/60"}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentIndex(index)
                    }}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
