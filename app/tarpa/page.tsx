"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"
import { Instagram } from "lucide-react"
import LocomotiveLayout from "@/components/locomotive-layout"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import ImageGallery from "@/components/image-gallery"

export default function TarpaPage() {
  const introRef = useRef(null)
  const offeringsRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Intro section animation
    gsap.fromTo(
      introRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: introRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        ease: "power3.out",
      },
    )

    // Offerings section animation
    gsap.fromTo(
      offeringsRef.current,
      { y: 100, opacity: 0 },
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

  const tarpaGalleryImages = [
    {
      src: "/images/tarpa-1.jpg",
      alt: "Tarpa musical instrument being played during a cultural ceremony",
    },
    {
      src: "/images/tarpa-2.jpg",
      alt: "Traditional Warli dance performance at Save Farm",
    },
    {
      src: "/images/tarpa-3.jpg",
      alt: "Eco-friendly accommodations surrounded by nature",
    },
    {
      src: "/images/tarpa-4.jpg",
      alt: "Organic farming practices at Save Farm",
    },
  ]

  const offerings = [
    {
      title: "Tribal Culture & Heritage",
      description:
        "Engage with the Warli community through storytelling, folk art, and dance performances that celebrate indigenous traditions and way of life.",
      image: "/images/tarpa-cultural.png",
    },
    {
      title: "Sustainable Stay",
      description:
        "Our nature-inspired accommodations are crafted using eco-friendly materials, designed to offer comfort while treading lightly on the earth.",
      image: "/images/tarpa-accommodations.jpg",
    },
    {
      title: "Guided Farm Walks",
      description:
        "Join our curated walks to explore organic farms, water harvesting systems, and native plant species while learning about rural sustainability.",
      image: "/images/tarpa-nature-walks.JPEG",
    },
    {
      title: "Rural Activities & Handicrafts",
      description:
        "Try your hand at traditional activities like mat weaving, pottery, or bamboo craft in interactive sessions guided by local artisans.",
      image: "/images/tarpa-workshops.JPEG",
    },
    {
      title: "Seasonal Meals from the Farm",
      description:
        "Enjoy freshly prepared meals using organic ingredients sourced directly from the farm, reflecting the seasonal bounty of the region.",
      image: "/images/tarpa-cuisine.JPEG",
    },
  ];

  return (
    <LocomotiveLayout>
      <main data-scroll-container>
        <Header />

        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden" data-scroll-section>
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/tarpa-hero.jpg"
              alt="Tarpa - Save Farm's signature experience"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-fern/30" />
          </div>

          <div className="container relative z-10 text-center px-4">
            <motion.h1
              className="text-4xl md:text-6xl font-serif text-warm-ivory mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Tarpa
            </motion.h1>

            <motion.p
              className="text-lg md:text-2xl text-warm-ivory/90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Our signature experience blending sustainable farming, tribal culture, and nature retreats
            </motion.p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 bg-warm-ivory" data-scroll-section ref={introRef}>
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-3xl md:text-4xl font-serif text-fern mb-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                The Essence of Tarpa
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
             <motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="flex flex-col items-center"
>
  <video
    autoPlay
    loop
    muted
    playsInline
    className="w-[70%] max-w-[700px] h-auto rounded-xl shadow-lg"
  >
    <source src="/images/tarpa-video.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  
  {/* Instagram handle below the video */}
  <a
    href="https://instagram.com/savefarmofficial" // replace with actual handle URL
    target="_blank"
    rel="noopener noreferrer"
    className="mt-4 flex items-center text-fern hover:text-fern/80 font-medium space-x-2"
  >
    <Instagram className="w-5 h-5" />
    <span>savefarmofficial</span>
  </a>
</motion.div>



                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <p className="text-natural text-lg mb-6 leading-relaxed">
                    Named after the traditional Warli wind instrument, “Tarpa” symbolizes rhythm, tribal unity, and coexistence with nature. Made from gourds and bamboo, its melodies have echoed through Maharashtra’s forests during harvests and celebrations.
                  </p>

                  <p className="text-natural text-lg mb-6 leading-relaxed">
                    At Save Farm, the Tarpa Agro-Eco Tourism Project captures this essence—offering a curated blend of organic farming, rural skill-building, nature trails, and indigenous cultural experiences rooted in Warli heritage.
                  </p>

                  <p className="text-natural text-lg leading-relaxed">
                    Tarpa invites travelers to reconnect with the land, slow down, and experience a farmstay that is grounded in tradition yet elevated with eco-conscious design and farm-fresh hospitality.
                  </p>
                </motion.div>

              </div>
            </div>
          </div>
        </section>

        {/* Offerings Section */}
        <section className="py-20 bg-fern/10" data-scroll-section ref={offeringsRef}>
          <div className="container px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-serif text-fern mb-12 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              The Tarpa Experience
            </motion.h2>

            <div className="space-y-16">
              {offerings.map((offering, index) => (
                <motion.div
                  key={offering.title}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className={`order-1 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="relative h-80 rounded-lg overflow-hidden">
                      <Image
                        src={offering.image || "/placeholder.svg"}
                        alt={offering.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className={`order-2 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                    <h3 className="text-2xl font-serif text-fern mb-4">{offering.title}</h3>
                    <p className="text-natural text-lg mb-6 leading-relaxed">{offering.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Experience Tarpa at Save Farm</h2>
              <p className="text-lg mb-8 opacity-90">
                Book your Tarpa experience today and embark on a journey of cultural discovery and natural harmony.
              </p>
              <Button asChild className="bg-warm-ivory text-fern hover:bg-warm-ivory/90">
                <Link href="/contact">
                  Book Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </LocomotiveLayout>
  )
}