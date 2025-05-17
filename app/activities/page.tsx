"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"

import LocomotiveLayout from "@/components/locomotive-layout"
import { Button } from "@/components/ui/button"
import ImageGallery from "@/components/image-gallery"

export default function ActivitiesPage() {
  const introRef = useRef(null)

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
  }, [])

  const activities = [
    {
      id: 1,
      name: "Farm Tour",
      description:
        "Embark on a comprehensive guided tour of Save Farm, exploring sustainable farming practices, diverse plant species, and innovative agricultural techniques.",
      image: "/images/farm-tour.jpg",
      highlights: [
        "Fruit-plant nursery exploration",
        "Greenhouses and shade houses",
        "Botanical garden with medicinal herbs",
        "Rainwater harvesting systems",
        "Bee-keeping and aquaponics demonstrations",
      ],
    },
    {
      id: 2,
      name: "Rural Skills Workshops",
      description:
        "Participate in hands-on workshops to learn traditional rural arts and crafts, gaining insight into the cultural heritage of the region.",
      image: "/images/rural-skills.jpg",
      highlights: [
        "Fishing techniques",
        "Mat weaving from coconut",
        "Coconut peeling",
        "Basket weaving from bamboo",
        "Warli painting sessions",
      ],
    },
    {
      id: 3,
      name: "Adventure Activities",
      description:
        "Experience thrilling adventure activities designed amidst the natural landscape of Save Farm, suitable for guests seeking excitement and challenge.",
      image: "/images/adventure-activities.jpg",
      highlights: [
        "Zip-line over rainwater harvesting pond",
        "Rope course in coconut orchard",
        "Use of professional-grade equipment",
        "Activities subject to age and fitness criteria",
      ],
    },
    {
      id: 4,
      name: "Souvenir Shopping",
      description:
        "Browse and purchase unique souvenirs crafted by local artisans, including farm-fresh produce and traditional artworks.",
      image: "/images/souvenir-shop.jpg",
      highlights: [
        "Fresh vegetables and fruits",
        "Processed farm products",
        "Warli art hand-painted T-shirts",
        "Canvas panels with traditional designs",
      ],
    },
  ];


  const activityGalleries = {
    1: [
      { src: "/images/farm-tours-1.jpg", alt: "Guided tour of organic farming practices" },
      { src: "/images/farm-tours-2.jpg", alt: "Visitors learning about sustainable agriculture" },
      { src: "/images/farm-tours-3.jpg", alt: "Farm animals interaction experience" },
    ],
    2: [
      { src: "/images/rural-skills-1.jpg", alt: "Traditional pottery workshop in progress" },
      { src: "/images/rural-skills-2.jpg", alt: "Weaving demonstration with natural materials" },
      { src: "/images/rural-skills-3.jpg", alt: "Organic farming techniques being taught" },
    ],
    3: [
      { src: "/images/adventure-arena-1.jpg", alt: "Exciting zipline adventure through the forest" },
      { src: "/images/adventure-arena-2.jpg", alt: "Challenging rope course activities" },
      { src: "/images/adventure-arena-3.jpg", alt: "Rock climbing wall for all skill levels" },
    ],
    4: [
      { src: "/images/souvenir-shop-1.jpg", alt: "Handcrafted local souvenirs on display" },
      { src: "/images/souvenir-shop-2.jpg", alt: "Organic farm products available for purchase" },
      { src: "/images/souvenir-shop-3.jpg", alt: "Artisanal crafts made by local artisans" },
    ],
  }

  return (
    <LocomotiveLayout>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden" data-scroll-section>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/activities-hero.jpg"
            alt="Save Farm activities"
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
            Farm Activities
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl text-warm-ivory/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Immerse yourself in nature with our range of engaging experiences
          </motion.p>
        </div>
      </section>

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
              Connect with Nature Through Experience
            </motion.h2>

            <motion.p
              className="text-natural text-lg mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              At Save Farm, we believe that the best way to reconnect with nature is through hands-on experiences. Our carefully curated activities allow you to engage with the natural world, learn traditional skills, and create lasting memories. Whether you're seeking adventure, knowledge, or simply a peaceful day on the farm, we have something for everyone.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Tarpa Highlight Section */}
      <section className="py-20 bg-fern/10" data-scroll-section>
        <div className="container px-4">
          <motion.div
            className="max-w-4xl mx-auto bg-warm-ivory rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-full min-h-[300px]">
                <Image
                  src="/images/tarpa-highlight.jpg"
                  alt="Tarpa - Our Highlight Experience"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-serif text-fern mb-4">Our Highlight Experience – Tarpa</h2>
                <p className="text-natural mb-6">
                  Inspired by the tribal instrument, Tarpa brings together sustainable agriculture, Warli culture, and rural
                  living. It reflects the harmony of people, nature, and tradition—offering guests a deeply immersive farmstay
                  rooted in authenticity and eco-tourism.
                </p>
                <Button asChild variant="outline" className="border-fern text-fern hover:bg-fern/10">
                  <Link href="/tarpa">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-fern/5" data-scroll-section>
        <div className="container px-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={`order-1 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                <ImageGallery images={activityGalleries[activity.id]} />
              </div>

              <div className={`order-2 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                <h3 className="text-2xl font-serif text-fern mb-4">{activity.name}</h3>
                <p className="text-natural mb-6">{activity.description}</p>

                <h4 className="text-lg font-medium text-fern mb-3">Highlights</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {activity.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center text-natural">
                      <div className="w-1.5 h-1.5 rounded-full bg-fern mr-2"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <Button asChild variant="outline" className="border-fern text-fern hover:bg-fern/10">
                  <Link href="/packages">
                    Book This Activity
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
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
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready for an Adventure?</h2>
            <p className="text-lg mb-8 opacity-90">Explore our packages and book your Save Farm experience today.</p>
            <Button asChild className="bg-warm-ivory text-fern hover:bg-warm-ivory/90">
              <Link href="/packages">
                View Packages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </LocomotiveLayout>
  )
}
