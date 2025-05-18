"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2 } from "lucide-react"
import { useAudio } from "@/context/audio-context"

export default function AudioInteractionPrompt() {
  const { toggleAudio } = useAudio()
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Show the prompt after a short delay
    const timer = setTimeout(() => {
      setShowPrompt(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleEnableAudio = () => {
    toggleAudio()
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          // Apply different styles based on the screen size
          className="fixed bottom-20 left-6 transform -translate-x-1/2 z-50 bg-warm-ivory/90 backdrop-blur-sm text-fern px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-xs 
                     sm:bottom-6 sm:left-20 sm:transform-none sm:-translate-x-0"
        >
          <Volume2 className="h-5 w-5 flex-shrink-0" />
          <div className="text-sm">
            <p>Experience Save Farm with ambient sounds</p>
          </div>
          <div className="flex gap-2 ml-2">
            <button
              onClick={handleEnableAudio}
              className="text-xs bg-fern text-warm-ivory px-2 py-1 rounded hover:bg-fern/90"
            >
              Enable
            </button>
            <button
              onClick={handleDismiss}
              className="text-xs border border-fern/30 px-2 py-1 rounded hover:bg-fern/10"
            >
              Later
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
