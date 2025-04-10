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
      name: "Farm Tours",
      description:
        "Guided tours of the farm showcasing sustainable farming practices and organic agriculture. Learn about our methods, meet our animals, and discover the principles of permaculture in action.",
      image: "/images/farm-tours.jpg",
      highlights: [
        "Organic farming demonstration",
        "Animal interaction",
        "Permaculture principles",
        "Harvest experience",
      ],
    },
    {
      id: 2,
      name: "Adventure Arena",
      description:
        "Experience the thrill of outdoor adventures with our ziplining, rope courses, and other exciting activities. Perfect for adrenaline seekers and those looking to challenge themselves in a safe environment.",
      image: "/images/adventure-arena.jpg",
      highlights: ["Ziplining", "Rope courses", "Rock climbing wall", "Team-building activities"],
    },
    {
      id: 3,
      name: "Rural Skills Workshops",
      description:
        "Traditional skill-based workshops such as pottery, weaving, organic farming, and local craftsmanship. Learn from skilled artisans and take home both knowledge and your own creations.",
      image: "/images/rural-skills.jpg",
      highlights: ["Pottery classes", "Weaving workshops", "Organic farming techniques", "Local craft sessions"],
    },
    {
      id: 4,
      name: "Souvenir Shop",
      description:
        "Our shop offers locally made crafts, organic farm products, and unique souvenirs from the farm. Take home a piece of Save Farm and support local artisans and sustainable production.",
      image: "/images/souvenir-shop.jpg",
      highlights: ["Organic produce", "Handmade crafts", "Local artwork", "Sustainable products"],
    },
  ]

  return (
    <LocomotiveLayout>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden" data-scroll-section>
        <div className="absolute inset-0 z-0">
          <Image src="/images/activities-hero.jpg" alt="Save Farm activities" fill className="object-cover" priority />
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
            className="text-lg md:text-xl text-warm-ivory/90 max-w-2xl mx-auto"
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
              At Save Farm, we believe that the best way to reconnect with nature is through hands-on experiences. Our
              carefully curated activities allow you to engage with the natural world, learn traditional skills, and
              create lasting memories. Whether you're seeking adventure, knowledge, or simply a peaceful day on the
              farm, we have something for everyone.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20" data-scroll-section>
        <div className="container px-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={`order-1 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image src={activity.image || "/placeholder.svg"} alt={activity.name} fill className="object-cover" />
                </div>
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
