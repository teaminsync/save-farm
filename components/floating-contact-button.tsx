"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MessageCircle } from "lucide-react"

export default function FloatingContactButton() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1,
      }}
    >
      <Link href="/contact">
        <motion.button
          className="bg-fern text-warm-ivory px-5 py-3 rounded-full flex items-center justify-center"
          whileHover={{
            scale: 1.05,
            y: -3,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Contact Us</span>
        </motion.button>
      </Link>
    </motion.div>
  )
}
