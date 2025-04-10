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

export default function AccommodationsPage() {
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

  const accommodations = [
    {
      id: 1,
      name: "Shetkari Niwas",
      description:
        "Traditional farmer's quarters offering a rustic, authentic experience with comfortable bedding, rustic decor, and attached bathroom.",
      image: "/images/shetkari-niwas.jpg",
      amenities: ["Comfortable bedding", "Rustic decor", "Attached bathroom", "Farm view"],
    },
    {
      id: 2,
      name: "Tulasi Vrindawan",
      description:
        "Inspired by the sacred Tulasi plant, these accommodations promote tranquility with a private garden, meditation space, and modern facilities.",
      image: "/images/tulasi-vrindawan.jpg",
      amenities: ["Private garden", "Meditation space", "Modern facilities", "Air conditioning"],
    },
    {
      id: 3,
      name: "Bamboo Hut",
      description:
        "Eco-friendly hut built with bamboo, offering sustainable and comfortable living with open-air design, natural ventilation, and rustic furnishings.",
      image: "/images/bamboo-hut.jpg",
      amenities: ["Open-air design", "Natural ventilation", "Rustic furnishings", "Private deck"],
    },
    {
      id: 4,
      name: "Coconut Log House",
      description:
        "Unique house made with coconut logs, offering distinctive architecture with spacious interiors, traditional design, and scenic views.",
      image: "/images/coconut-log-house.jpg",
      amenities: ["Spacious interiors", "Traditional design", "Scenic views", "Outdoor seating"],
    },
    {
      id: 5,
      name: "Machaan Hut",
      description:
        "Elevated hut offering panoramic views of the farm and surrounding nature, with an open deck, comfortable seating, and proximity to nature trails.",
      image: "/images/machaan-hut.jpg",
      amenities: ["Elevated position", "Open deck", "Comfortable seating", "Nature trail access"],
    },
    {
      id: 6,
      name: "Loft Huts",
      description:
        "Secluded loft-style huts offering a cozy retreat amidst nature, with a lofted sleeping area, private balcony, and hammock.",
      image: "/images/loft-huts.jpg",
      amenities: ["Lofted sleeping area", "Private balcony", "Hammock", "Forest view"],
    },
  ]

  return (
    <LocomotiveLayout>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden" data-scroll-section>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/accommodations-hero.jpg"
            alt="Save Farm accommodations"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-fern/30" />
        </div>

        <div className="container relative z-10 text-center px-4">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-serif text-warm-ivory mb-6 text-center px-4 max-w-5xl mx-auto leading-tight break-words"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Accommodations
          </motion.h1>


          <motion.p
            className="text-lg md:text-xl text-warm-ivory/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Luxury meets nature in our unique eco-friendly lodgings
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
              Experience Comfort in Nature
            </motion.h2>

            <motion.p
              className="text-natural text-lg mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              At Save Farm, we offer a range of unique accommodations that blend luxury with sustainability. Each of our
              lodgings is designed to provide comfort while maintaining a deep connection to the natural surroundings.
              From traditional farmer's quarters to elevated tree huts, our accommodations offer an authentic experience
              without sacrificing modern comforts.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Accommodations Section */}
      <section className="py-20 bg-fern/5" data-scroll-section>
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {accommodations.map((accommodation, index) => (
              <motion.div
                key={accommodation.id}
                className="bg-warm-ivory rounded-lg overflow-hidden shadow-md"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="relative h-80">
                  <Image
                    src={accommodation.image || "/placeholder.svg"}
                    alt={accommodation.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif text-fern mb-4">{accommodation.name}</h3>
                  <p className="text-natural mb-6">{accommodation.description}</p>

                  <h4 className="text-lg font-medium text-fern mb-3">Amenities</h4>
                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {accommodation.amenities.map((amenity, i) => (
                      <li key={i} className="flex items-center text-natural">
                        <div className="w-1.5 h-1.5 rounded-full bg-fern mr-2"></div>
                        {amenity}
                      </li>
                    ))}
                  </ul>

                  <Button asChild variant="outline" className="border-fern text-fern hover:bg-fern/10">
                    <Link href="/packages">
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
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
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready to Book Your Stay?</h2>
            <p className="text-lg mb-8 opacity-90">
              Explore our packages and find the perfect accommodation for your Save Farm experience.
            </p>
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
