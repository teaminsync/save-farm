"use client"

import { useState, useEffect } from "react"
import { Leaf } from "lucide-react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Check if device is a touch device
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0,
      )
    }

    checkTouchDevice()

    // If it's a touch device, don't apply custom cursor
    if (isTouchDevice) {
      document.body.style.cursor = ""
      return
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible, isTouchDevice])

  // Don't render custom cursor on touch devices
  if (isTouchDevice || !isVisible) return null

  return (
    <div
      className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* Outline/shadow leaf for contrast */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Leaf
          className="text-warm-ivory animate-leaf-sway"
          size={26}
          strokeWidth={3}
          fill="transparent"
          style={{ filter: "drop-shadow(0px 0px 2px rgba(251, 243, 219, 0.8))" }}
        />
      </div>

      {/* Main leaf - always fern colored */}
      <Leaf
        className="text-fern animate-leaf-sway transition-transform duration-200"
        size={22}
        strokeWidth={1.5}
        fill="#37422e"
      />
    </div>
  )
}
