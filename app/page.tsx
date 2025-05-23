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
import TestimonialCarousel from "@/components/testimonial-carousel"

export default function Home() {
  const logoRef = useRef(null)
  const introRef = useRef(null)
  const offeringsRef = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)

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

    // Ensure video plays immediately
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }
  }, [])

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  const testimonials = [
    {
      name: "Priyanka Pimple",
      text: "I had the pleasure of visiting Save Farm (Tarpa resort) that exceeded all of my expectations. From the moment I arrived, I was greeted with warm smiles and exceptional service that made my stay truly unforgettable.",
      category: "Holiday ❘ Family",
    },
    {
      name: "Gugush Irani",
      text: "Save Farm is a peaceful retreat away from the city. The rooms are clean, the food is delicious, and the activities like pottery and farm tours are fun. The owners are warm and welcoming. A perfect place to relax with friends in nature's lap.",
      category: "Holiday ❘ Friends",
    },
    {
      name: "Sawan Patel",
      text: "Our stay in the Machan Hut was wonderful. The verandah was our favorite spot. Cleanliness and amenities were spot on. We enjoyed the pottery activity and tractor tour. The food was simple but decent. Peaceful, green, and very close to Gholvad station. Will revisit!",
      category: "Holiday ❘ Couple",
    },
    {
      name: "Mangesh Borkar",
      text: "Save Farm was perfect for our family trip. The pool was clean, the activities were engaging, and the tractor ride was a highlight. Food, ambience, and stay all scored full marks. A fun and peaceful experience we'd love to repeat with our children again.",
      category: "Holiday ❘ Family",
    },
  ]

  return (
    <LocomotiveLayout>
      <AudioInteractionPrompt />

      <section className="relative h-screen flex items-center justify-center overflow-hidden" data-scroll-section>
        <motion.div className="absolute inset-0 z-0" style={{ opacity, scale }}>
          <video
            ref={videoRef}
            src="/images/hero-background.mp4"
            autoPlay
            playsInline
            muted
            loop
            preload="auto"
            className="object-cover w-full h-full"
            poster="/images/video-poster.png"
          >
            Save Farm serene landscape video.
          </video>

          <div className="absolute inset-0 bg-fern/20" />
        </motion.div>

        <div className="container relative z-10 text-center px-4">
          <motion.div
            ref={logoRef}
            className="mx-auto mb-8 w-40 h-40 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Image src="/images/save-farm-logo.svg" alt="Save Farm Logo" fill className="object-contain" priority />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-serif text-warm-ivory mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Reconnect with Nature
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-natural max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Experience serenity in the heart of nature at Save Farm, where modern comfort blends with sustainable
            living.
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-fern mb-3">Elegant Retreats</h3>
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
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

      <section className="py-20 bg-natural/10 w-full" data-scroll-section>
        <div className="w-full px-4 md:px-8">
          <motion.div
            className="mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-fern mb-12 text-center">What Our Guests Say</h2>
            <div className="min-h-[300px] md:min-h-[180px]">
              <TestimonialCarousel testimonials={testimonials} />
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
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Questions About Your Stay?</h2>
            <p className="text-lg mb-8 opacity-90">
              Find answers to common questions about accommodations, activities, booking policies, and more in our
              comprehensive FAQ section.
            </p>

            <Button asChild className="bg-warm-ivory text-fern hover:bg-warm-ivory/90">
              <Link href="/about#faq">
                View FAQs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </LocomotiveLayout>
  )
}