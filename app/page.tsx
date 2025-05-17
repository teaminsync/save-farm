"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"

import LocomotiveLayout from "@/components/locomotive-layout"
import { Button } from "@/components/ui/button"
import AudioInteractionPrompt from "@/components/audio-interaction-prompt"

export default function Home() {
  const logoRef = useRef(null)
  const introRef = useRef(null)
  const offeringsRef = useRef(null)

  // Register ScrollTrigger plugin
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Logo animation
    gsap.fromTo(
      logoRef.current,
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      },
    )

    // Intro section animation
    gsap.fromTo(
      introRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      },
    )

    // Offerings section animation with ScrollTrigger
    gsap.fromTo(
      offeringsRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: offeringsRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        ease: "power3.out",
      },
    )
  }, [])

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  return (
    <LocomotiveLayout>
      <AudioInteractionPrompt />

      <section className="relative h-screen flex items-center justify-center overflow-hidden" data-scroll-section>
        <motion.div className="absolute inset-0 z-0" style={{ opacity, scale }}>
          <video
            src="/images/hero-background.mp4"
            autoPlay
            loop
            muted
            className="object-cover w-full h-full"
          >
            Save Farm serene landscape video.
          </video>

          <div className="absolute inset-0 bg-fern/20" />
        </motion.div>
        {/* <motion.div className="absolute inset-0 z-0" style={{ opacity, scale }}>
          <Image
            src="/images/hero-background.jpg"
            alt="Save Farm serene landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-fern/20" />
        </motion.div> */}

        <div className="container relative z-10 text-center px-4">
          <motion.div
            ref={logoRef}
            className="mx-auto mb-8 w-40 h-40 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Image src="/images/save-farm-logo.svg" alt="Save Farm Logo" fill className="object-contain" />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-serif text-warm-ivory mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Reconnect with Nature
          </motion.h1>

          {/* <motion.h1
            className="text-4xl md:text-6xl font-serif text-fern mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Reconnect with Nature
          </motion.h1>

          <motion.h1
            className="text-4xl md:text-6xl font-serif text-natural mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Reconnect with Nature
          </motion.h1> */}

          <motion.p
            className="text-lg md:text-xl text-natural max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Experience serenity in the heart of nature at Save Farm, where modern comfort blends with sustainable living.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Button asChild className="bg-fern hover:bg-fern/90 text-warm-ivory">
              <Link href="/accommodations">
                Explore Accommodations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            {/* <Button asChild className="bg-fern hover:bg-fern/90 text-warm-ivory px-6 py-3 text-lg">
              <Link href="/accommodations" className="flex items-center">
                Explore Accommodations
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button> */}

          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-fern text-sm mb-2">Scroll to discover</span>
            <div className="w-0.5 h-8 bg-fern/50 animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Rest of your sections remain unchanged */}
      {/* Introduction Section */}
      <section className="py-20 bg-warm-ivory" data-scroll-section ref={introRef}>
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-serif text-fern mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Our Mission
            </motion.h2>

            <motion.p
              className="text-natural text-lg mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Save Farm is built on the vision of reconnecting people with the land—offering an authentic rural
              experience grounded in sustainability, culture, and community. Our mission is to transform tourism into a
              tool for awareness, well-being, and ecological balance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button asChild variant="outline" className="border-fern text-fern hover:bg-fern/10">
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Offerings Section */}
      <section className="py-20 bg-fern/10" data-scroll-section ref={offeringsRef}>
        <div className="container px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-serif text-fern mb-12 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Experience Save Farm
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Accommodations Card */}
            <motion.div
              className="bg-warm-ivory rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-60">
                <Image
                  src="/images/accommodation-preview.jpg"
                  alt="Luxury accommodations at Save Farm"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-fern mb-3">Luxury Accommodations</h3>
                <p className="text-natural mb-4">
                  Experience our unique eco-friendly accommodations, from traditional Shetkari Niwas to elevated Machaan
                  Huts.
                </p>
                <Link href="/accommodations" className="text-fern font-medium flex items-center hover:underline">
                  View Accommodations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Activities Card */}
            <motion.div
              className="bg-warm-ivory rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-60">
                <Image
                  src="/images/activities-preview.jpg"
                  alt="Farm activities and adventures"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-fern mb-3">Farm Activities</h3>
                <p className="text-natural mb-4">
                  From guided farm tours to adventure arenas and rural skills workshops, there's something for everyone.
                </p>
                <Link href="/activities" className="text-fern font-medium flex items-center hover:underline">
                  Explore Activities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Packages Card */}
            <motion.div
              className="bg-warm-ivory rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-60">
                <Image
                  src="/images/packages-preview.jpg"
                  alt="Save Farm packages and experiences"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-fern mb-3">Curated Packages</h3>
                <p className="text-natural mb-4">
                  Choose from our day tours or overnight stay packages for a complete Save Farm experience.
                </p>
                <Link href="/packages" className="text-fern font-medium flex items-center hover:underline">
                  View Packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-natural/10" data-scroll-section>
        <div className="container px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-fern mb-12">What Our Guests Say</h2>

            <div className="relative">
              <div className="text-5xl text-fern/20 absolute -top-8 left-0">"</div>
              <p className="text-natural text-lg italic mb-6 leading-relaxed">
                Save Farm was the perfect escape from city life. The Bamboo Hut was beautifully designed, and the farm
                tour gave us a new appreciation for sustainable living. We'll definitely be back!
              </p>
              <div className="text-5xl text-fern/20 absolute -bottom-8 right-0">"</div>
            </div>

            <div className="mt-8">
              <p className="text-fern font-medium">Virat Kohli</p>
              <p className="text-natural text-sm">Mumbai, India</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-fern text-warm-ivory" data-scroll-section>
        <div className="container px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready to Experience Save Farm?</h2>
            <p className="text-lg mb-8 opacity-90">
              Book your stay now and discover the perfect balance of comfort and nature.
            </p>

            <Button asChild className="bg-warm-ivory text-fern hover:bg-warm-ivory/90">
              <Link href="/packages">
                View Our Packages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </LocomotiveLayout>
  )
}