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
            About Us
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl text-warm-ivory/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our story, mission, and commitment to sustainable living with modern comforts
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
              Save Farm is built on the vision of reconnecting people with the land—offering an authentic rural experience grounded in sustainability, culture, and community. Our mission is to transform tourism into a tool for awareness, well-being, and ecological balance.
            </motion.p>

            <motion.p
              className="text-natural text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              We strive to create a sanctuary where guests experience the serenity of village life, learn about organic farming, and immerse themselves in nature without compromising on comfort. Every stay supports conservation, local livelihoods, and mindful tourism.
            </motion.p>

            <motion.p
              className="text-natural text-lg leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Whether it’s walking through our orchards, joining a Warli art session, or simply listening to birdsong at sunrise—Save Farm invites you to slow down, engage with your surroundings, and rediscover the joy of living in harmony with nature.
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
                    src="/images/farm-history.JPEG"
                    alt="Save Farm in its early days"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center text-natural mt-3 font-semibold text-lg italic">
                  Mr. Prabhakar Save
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-natural text-lg mb-6 leading-relaxed">
                  Save Farm was born from a dream to transform barren land into a thriving horticultural paradise. What began in 1970 as a passion project by the Save family soon blossomed into a lush orchard in Maharashtra’s Konkan region.
                </p>

                <p className="text-natural text-lg mb-6 leading-relaxed">
                  Decades of scientific farming and experimentation led to the birth of Save Nursery — now a trusted name in plant supply and green knowledge sharing. Our hands-on expertise continues to inspire farmers, students, and eco-tourists alike.
                </p>

                <p className="text-natural text-lg leading-relaxed">
                  In 2015, we introduced Tarpa, our agro-eco tourism initiative rooted in Warli culture and sustainable living. Today, Save Farm stands as a symbol of regeneration, offering rural stays that are both restorative and rooted in tradition.
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
