"use client"

import { useEffect, useState } from "react"
import { Leaf } from "lucide-react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Add cursor:none to the body to hide the default cursor
    document.body.style.cursor = "none"

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener("mousemove", updateCursorPosition)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    // Add cursor:none to all clickable elements
    const clickableElements = document.querySelectorAll("a, button, [role=button], input, select, textarea")
    clickableElements.forEach((el) => {
      ;(el as HTMLElement).style.cursor = "none"
    })

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.body.style.cursor = ""

      // Reset cursor on cleanup
      clickableElements.forEach((el) => {
        ;(el as HTMLElement).style.cursor = ""
      })
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div
      className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
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
