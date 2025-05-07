"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function usePageTransition() {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayPath, setDisplayPath] = useState(pathname)

  useEffect(() => {
    if (pathname !== displayPath) {
      setIsTransitioning(true)

      // Start transition
      const timeout = setTimeout(() => {
        setDisplayPath(pathname)
        setIsTransitioning(false)
      }, 500) // Match this with your transition duration

      return () => clearTimeout(timeout)
    }
  }, [pathname, displayPath])

  return { isTransitioning, displayPath }
}
