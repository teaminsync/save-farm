"use client"

import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import { useAudio } from "@/context/audio-context"

export default function AudioControlButton() {
  const { isPlaying, toggleAudio } = useAudio()

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.2,
      }}
    >
      <motion.button
        className="bg-fern text-warm-ivory p-3 rounded-full flex items-center justify-center shadow-lg"
        whileHover={{
          scale: 1.05,
          y: -3,
        }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleAudio}
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
      >
        {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </motion.button>
    </motion.div>
  )
}
