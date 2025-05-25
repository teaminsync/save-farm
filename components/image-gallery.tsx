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
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const savedScrollPosition = useRef(0)
  const locomotiveScrollInstance = useRef<any>(null)
  const retryAttempts = useRef<Record<string, number>>({})

  // Client-side only
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Enhanced image preloading with retry logic
  const preloadImage = useCallback(
    (src: string, maxRetries = 3): Promise<void> => {
      return new Promise((resolve) => {
        if (!src || src.trim() === "" || imagesLoaded[src]) {
          resolve()
          return
        }

        const img = new window.Image()
        img.crossOrigin = "anonymous"

        const attemptLoad = (attempt: number) => {
          img.onload = () => {
            setImagesLoaded((prev) => ({
              ...prev,
              [src]: true,
            }))
            setImageErrors((prev) => ({
              ...prev,
              [src]: false,
            }))
            resolve()
          }

          img.onerror = () => {
            console.warn(`Failed to load image: ${src} (attempt ${attempt}/${maxRetries})`)

            if (attempt < maxRetries) {
              // Retry with exponential backoff
              setTimeout(() => {
                attemptLoad(attempt + 1)
              }, Math.pow(2, attempt) * 1000)
            } else {
              console.error(`Failed to load image after ${maxRetries} attempts: ${src}`)
              setImageErrors((prev) => ({
                ...prev,
                [src]: true,
              }))
              resolve()
            }
          }

          // Add cache busting for retries
          const cacheBuster = attempt > 1 ? `?retry=${attempt}&t=${Date.now()}` : ""
          img.src = src + cacheBuster
        }

        attemptLoad(1)
      })
    },
    [imagesLoaded],
  )

  // Preload all images with staggered loading
  useEffect(() => {
    const preloadImages = async () => {
      if (!images || images.length === 0) return

      // Load first image immediately
      if (images[0]?.src) {
        await preloadImage(images[0].src)
      }

      // Load remaining images with small delays to prevent overwhelming the browser
      for (let i = 1; i < images.length; i++) {
        if (images[i]?.src) {
          setTimeout(() => {
            preloadImage(images[i].src)
          }, i * 200) // 200ms delay between each image
        }
      }
    }

    preloadImages()
  }, [images, preloadImage])

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
    const findLocomotiveScroll = () => {
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

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false)
      }
    }

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

  // Scroll locking functions
  const lockScroll = useCallback(() => {
    savedScrollPosition.current = window.scrollY

    if (locomotiveScrollInstance.current) {
      locomotiveScrollInstance.current.stop()
    }

    document.documentElement.style.overflow = "hidden"
    document.documentElement.style.height = "100%"
    document.body.style.overflow = "hidden"
    document.body.style.height = "100%"
    document.body.style.touchAction = "none"
    document.body.style.position = "fixed"
    document.body.style.top = `-${savedScrollPosition.current}px`
    document.body.style.width = "100%"

    window.addEventListener("wheel", preventDefaultScroll, { passive: false })
    window.addEventListener("touchmove", preventDefaultScroll, { passive: false })
  }, [])

  const unlockScroll = useCallback(() => {
    if (locomotiveScrollInstance.current) {
      locomotiveScrollInstance.current.start()
    }

    document.documentElement.style.overflow = ""
    document.documentElement.style.height = ""
    document.body.style.overflow = ""
    document.body.style.height = ""
    document.body.style.touchAction = ""
    document.body.style.position = ""
    document.body.style.top = ""
    document.body.style.width = ""

    window.scrollTo(0, savedScrollPosition.current)

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
    if (touchStartX.current !== 0) {
      const currentX = e.touches[0].clientX
      const diff = touchStartX.current - currentX

      if (Math.abs(diff) > 10) {
        e.preventDefault()
      }
    }

    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === 0 || touchEndX.current === 0) {
      return
    }

    const diff = touchStartX.current - touchEndX.current

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }

    touchStartX.current = 0
    touchEndX.current = 0
  }

  const handleTouchCancel = () => {
    touchStartX.current = 0
    touchEndX.current = 0
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const closeEvent = new CustomEvent("closeAllImageGalleries")
      window.dispatchEvent(closeEvent)
    }
    setIsFullscreen(!isFullscreen)
  }

  // Handle image load error with retry
  const handleImageError = useCallback((src: string) => {
    const currentAttempts = retryAttempts.current[src] || 0
    if (currentAttempts < 3) {
      retryAttempts.current[src] = currentAttempts + 1
      // Force re-render to retry loading
      setTimeout(() => {
        setImagesLoaded((prev) => ({
          ...prev,
          [src]: false,
        }))
      }, 1000 * Math.pow(2, currentAttempts))
    } else {
      setImageErrors((prev) => ({
        ...prev,
        [src]: true,
      }))
    }
  }, [])

  // Ensure we have valid images to display
  if (!images || images.length === 0) {
    return (
      <div className="relative rounded-lg overflow-hidden bg-fern/10 h-80 flex items-center justify-center">
        <p className="text-natural">No images available</p>
      </div>
    )
  }

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
        <div className="relative h-[320px] md:h-80 w-full bg-fern/5">
          {/* Display all images but only show the current one */}
          {images.map((image, index) => {
            const src = image?.src && image.src.trim() !== "" ? image.src : placeholderImage
            const isCurrentImage = index === currentIndex
            const isLoaded = imagesLoaded[src]
            const hasError = imageErrors[src]

            return (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isCurrentImage ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {hasError ? (
                  // Error fallback
                  <div className="w-full h-full flex items-center justify-center bg-fern/10">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-fern/20 rounded-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-fern/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-fern/60">Image unavailable</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <NextImage
                      src={src}
                      alt={image?.alt || "Gallery image"}
                      fill
                      className={`object-cover transition-opacity duration-300 ${
                        isLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={75}
                      onLoad={() => {
                        setImagesLoaded((prev) => ({
                          ...prev,
                          [src]: true,
                        }))
                      }}
                      onError={() => handleImageError(src)}
                      unoptimized={false}
                    />

                    {/* Loading indicator */}
                    {isCurrentImage && !isLoaded && !hasError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-fern/5">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 border-2 border-fern border-t-transparent rounded-full animate-spin mb-2" />
                          <p className="text-sm text-fern/60">Loading...</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
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

      {/* Fullscreen Modal */}
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
              <div className="relative aspect-video w-full bg-black/20 rounded-lg overflow-hidden">
                {imageErrors[imageSrc] ? (
                  // Error fallback for modal
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-warm-ivory">
                      <div className="w-20 h-20 mx-auto mb-4 bg-warm-ivory/20 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-warm-ivory/60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-warm-ivory/80">Image unavailable</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <NextImage
                      src={imageSrc}
                      alt={currentImage?.alt || "Gallery image"}
                      fill
                      className={`object-contain transition-opacity duration-300 ${
                        imagesLoaded[imageSrc] ? "opacity-100" : "opacity-0"
                      }`}
                      sizes="100vw"
                      quality={90}
                      priority
                      onLoad={() => {
                        setImagesLoaded((prev) => ({
                          ...prev,
                          [imageSrc]: true,
                        }))
                      }}
                      onError={() => handleImageError(imageSrc)}
                      unoptimized={false}
                    />

                    {/* Loading indicator for modal */}
                    {!imagesLoaded[imageSrc] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center text-warm-ivory">
                          <div className="w-12 h-12 border-3 border-warm-ivory border-t-transparent rounded-full animate-spin mb-4" />
                          <p className="text-warm-ivory/80">Loading image...</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
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
