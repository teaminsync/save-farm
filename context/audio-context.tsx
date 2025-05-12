"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type AudioContextType = {
  isPlaying: boolean
  toggleAudio: () => void
  volume: number
  setVolume: (volume: number) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element only on client side
    const audioElement = new Audio("/audio/background-music.mp3")
    audioElement.loop = true
    audioElement.volume = volume
    setAudio(audioElement)

    // Clean up on unmount
    return () => {
      if (audioElement) {
        audioElement.pause()
        audioElement.src = ""
      }
    }
  }, [])

  useEffect(() => {
    if (!audio) return

    // Update volume when it changes
    audio.volume = volume
  }, [volume, audio])

  useEffect(() => {
    if (!audio) return

    // Play or pause based on isPlaying state
    if (isPlaying) {
      // Use a promise and catch any errors (browsers may block autoplay)
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Autoplay prevented:", error)
          setIsPlaying(false)
        })
      }
    } else {
      audio.pause()
    }
  }, [isPlaying, audio])

  const toggleAudio = () => {
    setIsPlaying((prev) => !prev)
  }

  return <AudioContext.Provider value={{ isPlaying, toggleAudio, volume, setVolume }}>{children}</AudioContext.Provider>
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}
