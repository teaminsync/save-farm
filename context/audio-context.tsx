"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef } from "react"

interface AudioContextType {
  isPlaying: boolean
  hasInteracted: boolean
  toggleAudio: () => void
  setHasInteracted: (value: boolean) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    // Only create the audio element after user interaction
    if (hasInteracted && !audioRef.current) {
      const audio = new Audio("/audio/background-music.mp3")
      audio.loop = true
      audio.volume = 0.4

      // For mobile devices, we need to handle autoplay restrictions
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      if (isMobile) {
        // Add a touch event listener to the document to enable audio on first touch
        const enableAudioOnTouch = () => {
          if (audioRef.current) {
            const playPromise = audioRef.current.play()
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                console.error("Mobile audio play failed:", error)
              })
            }
          }
          document.removeEventListener("touchstart", enableAudioOnTouch)
        }
        document.addEventListener("touchstart", enableAudioOnTouch, { once: true })
      }

      // Add event listeners
      audio.addEventListener("canplaythrough", () => {
        setAudioLoaded(true)
      })

      audioRef.current = audio

      // Clean up
      return () => {
        audio.pause()
        audio.src = ""
        audioRef.current = null
      }
    }
  }, [hasInteracted])

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current || !audioLoaded) return

    if (isPlaying) {
      const playPromise = audioRef.current.play()

      // Handle play promise to avoid DOMException
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Audio play failed:", error)
          setIsPlaying(false)
        })
      }
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, audioLoaded])

  const toggleAudio = () => {
    setIsPlaying((prev) => !prev)
    if (!hasInteracted) {
      setHasInteracted(true)
    }
  }

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        hasInteracted,
        toggleAudio,
        setHasInteracted,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}
