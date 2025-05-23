"use client"

import { useState, useEffect } from "react"
import { useLocomotiveScroll } from "react-locomotive-scroll"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

type ScrollEvent = {
  scroll: {
    y: number
    x: number
  }
}

export default function Header() {
  const { scroll } = useLocomotiveScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!scroll) return

    const onScroll = (data: ScrollEvent) => {
      setIsScrolled(data.scroll.y > 10)
    }

    scroll.on("scroll", onScroll)
    return () => scroll.off("scroll", onScroll)
  }, [scroll])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/tarpa", label: "Tarpa" },
    { href: "/activities", label: "Activities" },
    { href: "/accommodations", label: "Accommodations" },
    { href: "/packages", label: "Packages" },
    { href: "/about#faq", label: "FAQs" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-warm-ivory shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link href="/" className="relative z-50">
          <div className="flex items-center">
            <div className="relative w-10 h-10">
              <Image
                src={
                  isScrolled || isMobileMenuOpen
                    ? "/images/save-farm-logo2-scrolled.svg"
                    : "/images/save-farm-logo2.svg"
                }
                alt="Save Farm Logo"
                fill
                className="object-contain"
              />
            </div>
            <span
              className={`ml-2 font-serif text-xl ${isScrolled || isMobileMenuOpen ? "text-fern" : "text-warm-ivory"}`}
            >
              S
              <span style={{ position: "relative", display: "inline-block", letterSpacing: "-0.15em" }}>
                <span className="font-serif">A</span>
                <span
                  style={{
                    position: "absolute",
                    top: "-0.0em",
                    left: "-0.05em",
                    fontSize: "1.5em",
                    fontWeight: "lighter",
                  }}
                >
                  ˉ
                </span>
              </span>
              VÉ FARMS
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium transition-colors duration-200 ${
                isScrolled ? "text-fern hover:text-fern/70" : "text-warm-ivory hover:text-warm-ivory/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden relative z-50"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-fern" />
          ) : (
            <Menu className={`h-6 w-6 ${isScrolled ? "text-fern" : "text-warm-ivory"}`} />
          )}
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden 
            bg-gradient-to-br from-warm-ivory/50 to-warm-ivory/80 
            backdrop-blur-xl border border-fern/20 
            shadow-2xl rounded-2xl px-6 glass-inner-glow"
            >
              <nav className="flex flex-col items-center space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-fern text-xl font-medium hover:text-fern/70 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
