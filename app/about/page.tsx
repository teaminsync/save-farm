"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import LocomotiveLayout from "@/components/locomotive-layout"

export default function AboutPage() {
  const missionRef = useRef(null)
  const historyRef = useRef(null)
  const logoRef = useRef(null)
  const valuesRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Mission section animation
    gsap.fromTo(
      missionRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: missionRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        ease: "power3.out",
      },
    )

    // History section animation
    gsap.fromTo(
      historyRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: historyRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        ease: "power3.out",
      },
    )

    // Logo animation
    gsap.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        ease: "power3.out",
      },
    )

    // Values section animation
    gsap.fromTo(
      valuesRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        ease: "power3.out",
      },
    )
  }, [])

  return (
    <LocomotiveLayout>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden" data-scroll-section>
        <div className="absolute inset-0 z-0">
          <Image src="/images/about-hero.jpg" alt="Save Farm landscape" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-fern/30" />
        </div>

        <div className="container relative z-10 text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-serif text-warm-ivory mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Save Farm
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-warm-ivory/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our story, mission, and commitment to sustainable luxury
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-warm-ivory" data-scroll-section ref={missionRef}>
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-serif text-fern mb-8 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Our Mission
            </motion.h2>

            <motion.p
              className="text-natural text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              At Save Farm, our mission is to create a sanctuary where people can escape the hustle of modern life and
              reconnect with the natural world. We believe that in today's fast-paced, technology-driven society, many
              have lost touch with the rhythms of nature and the simple joys of rural living.
            </motion.p>

            <motion.p
              className="text-natural text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              We aim to bridge this gap by offering a unique experience that combines the comfort and luxury of modern
              accommodations with the authenticity and tranquility of farm life. Our sustainable practices and
              eco-friendly approach ensure that we preserve the natural beauty of our surroundings while providing our
              guests with an unforgettable experience.
            </motion.p>

            <motion.p
              className="text-natural text-lg leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Through our various activities, workshops, and accommodations, we invite our guests to slow down, breathe
              deeply, and rediscover the joy of living in harmony with nature. We believe that this reconnection is not
              just beneficial for individual well-being, but also essential for fostering a more sustainable and mindful
              approach to life.
            </motion.p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-fern/10" data-scroll-section ref={historyRef}>
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-serif text-fern mb-8 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Our History
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src="/images/farm-history.jpg"
                    alt="Save Farm in its early days"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-natural text-lg mb-6 leading-relaxed">
                  Save Farm was established in 2010 by a group of environmentalists and hospitality experts who shared a
                  vision of creating a space where sustainable living and luxury could coexist.
                </p>

                <p className="text-natural text-lg mb-6 leading-relaxed">
                  What began as a small organic farm has grown into a renowned destination that attracts visitors from
                  across the country and beyond. Over the years, we have expanded our accommodations, activities, and
                  facilities, always staying true to our core values of sustainability, authenticity, and excellence.
                </p>

                <p className="text-natural text-lg leading-relaxed">
                  Today, Save Farm stands as a testament to the possibility of creating a luxurious retreat that
                  respects and celebrates the natural world, offering our guests a unique opportunity to experience the
                  best of both worlds.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Symbolism Section */}
      <section className="py-20 bg-warm-ivory" data-scroll-section ref={logoRef}>
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-serif text-fern mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Our Logo: A Symbol of Connection
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="relative w-64 h-64">
                  <Image src="/images/save-farm-logo2-scrolled.svg" alt="Save Farm Logo" fill className="object-contain" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-left"
              >
                <p className="text-natural text-lg mb-6 leading-relaxed">
                  Our logo—a hand reaching toward a leaf—symbolizes the core philosophy of Save Farm: the reconnection
                  between humanity and nature.
                </p>

                <p className="text-natural text-lg mb-6 leading-relaxed">
                  The hand represents human touch, care, and intention, while the leaf embodies the natural world in all
                  its beauty and wisdom. The space between them illustrates the journey of reconnection that we invite
                  our guests to experience.
                </p>

                <p className="text-natural text-lg leading-relaxed">
                  This simple yet powerful symbol reminds us of our mission to bridge the gap between modern living and
                  the natural world, creating a space where both can thrive in harmony.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-natural/10" data-scroll-section ref={valuesRef}>
        <div className="container px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-serif text-fern mb-12 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Core Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Sustainability Value */}
            <motion.div
              className="bg-warm-ivory rounded-lg p-8 shadow-md"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-xl font-serif text-fern mb-4">Sustainability</h3>
              <p className="text-natural">
                We are committed to sustainable practices in every aspect of our operation, from organic farming and
                renewable energy to waste reduction and water conservation. We believe in preserving the natural beauty
                of our surroundings for future generations.
              </p>
            </motion.div>

            {/* Authenticity Value */}
            <motion.div
              className="bg-warm-ivory rounded-lg p-8 shadow-md"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-xl font-serif text-fern mb-4">Authenticity</h3>
              <p className="text-natural">
                We offer genuine experiences that reflect the true essence of rural life and traditional practices. Our
                accommodations, activities, and cuisine are designed to provide an authentic connection to the land and
                local culture.
              </p>
            </motion.div>

            {/* Excellence Value */}
            <motion.div
              className="bg-warm-ivory rounded-lg p-8 shadow-md"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-xl font-serif text-fern mb-4">Excellence</h3>
              <p className="text-natural">
                We strive for excellence in everything we do, from the quality of our accommodations and the
                professionalism of our staff to the thoughtfulness of our activities and the flavor of our farm-to-table
                cuisine. We are dedicated to exceeding our guests' expectations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </LocomotiveLayout>
  )
}
