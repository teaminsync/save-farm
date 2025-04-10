import { ReactNode, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { LocomotiveScrollProvider } from "react-locomotive-scroll"
import { AnimatePresence, motion } from "framer-motion"

import Header from "@/components/header"
import Footer from "@/components/footer"

interface LocomotiveLayoutProps {
  children: ReactNode;
}

export default function LocomotiveLayout({ children }: LocomotiveLayoutProps) {
  const containerRef = useRef(null)
  const pathname = usePathname()
  const [isReady, setIsReady] = useState(false)

  // Set isReady to true after initial render to avoid hydration issues
  useEffect(() => {
    setIsReady(true)
  }, [])

  // Reset scroll position when pathname changes
  useEffect(() => {
    if (containerRef.current) {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  if (!isReady) return null

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        lerp: 0.05,
        tablet: {
          smooth: true,
          breakpoint: 768,
        },
        smartphone: {
          smooth: true,
        },
        reloadOnContextChange: true,
      }}
      containerRef={containerRef}
      watch={[pathname]}
    >
      <div ref={containerRef} data-scroll-container>
        <Header />

        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>

        <Footer />
      </div>
    </LocomotiveScrollProvider>
  )
}
