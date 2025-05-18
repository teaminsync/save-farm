"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This is where you would typically initialize analytics
    // and track page views
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // Example of tracking page view (replace with your actual analytics code)
    if (typeof window !== "undefined") {
      // Track page view
      console.log(`Page view: ${url}`)
    }
  }, [pathname, searchParams])

  return null
}
