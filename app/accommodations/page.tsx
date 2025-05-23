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
      roomType: "Family Room",
      tariff: "₹11,500 for 4 guests",
      description:
        "Originally constructed in 1989 to host farmers visiting our nursery, Shetkari Niwas has been thoughtfully renovated for guests seeking comfort and authenticity. These ground-level rooms feature senior-friendly bathrooms and can comfortably accommodate up to four guests each.",
      images: [
        "/images/shetkari-niwas-1.jpg",
        "/images/shetkari-niwas-2.jpg",
        "/images/shetkari-niwas-3.jpg",
        "/images/shetkari-niwas-4.jpg",
      ],
      amenities: [
        "Ground-level access",
        "Senior-friendly bathrooms",
        "Accommodates up to 4 guests",
        "Authentic rural ambiance",
      ],
    },
    {
      id: 2,
      name: "Tulasi Vrindavan",
      roomType: "Couple Room",
      tariff: "₹7,500 for 2 guests",
      description:
        "Tulasi Vrindavan exudes traditional Kokani charm with its Mangalorean tiled roof. This couple room is perfect for two guests seeking a cozy and culturally rich stay, with the option to accommodate one extra person.",
      images: [
        "/images/tulasi-vrindavan-1.jpg",
        "/images/tulasi-vrindavan-2.jpg",
        "/images/tulasi-vrindavan-3.jpg",
        "/images/tulasi-vrindavan-4.jpg",
      ],
      amenities: [
        "Traditional Kokani architecture",
        "Mangalorean tiled roof",
        "Suitable for couples",
        "Can accommodate 1 extra person",
      ],
    },
    {
      id: 3,
      name: "Bamboo Hut",
      roomType: "Couple Room",
      tariff: "₹7,500 for 2 guests",
      description:
        "Crafted from sustainable bamboo, these huts offer an eco-friendly retreat amidst nature. With natural ventilation and rustic interiors, they provide a serene escape for guests seeking simplicity and tranquility.",
      images: [
        "/images/bamboo-hut-1.jpg",
        "/images/bamboo-hut-2.jpg",
        "/images/bamboo-hut-3.jpg",
        "/images/bamboo-hut-4.jpg",
      ],
      amenities: [
        "Eco-friendly bamboo construction",
        "Natural ventilation",
        "Rustic interiors",
        "Close proximity to nature",
      ],
    },
    {
      id: 4,
      name: "Coconut Log House",
      roomType: "Family Room",
      tariff: "₹11,500 for 4 guests",
      description:
        "The Coconut Log House features twin rooms with thatched roofs, each equipped with a double bed and a sofa-cum-double bed. It's an ideal choice for families of up to four members.",
      images: [
        "/images/coconut-log-house-1.jpg",
        "/images/coconut-log-house-2.jpg",
        "/images/coconut-log-house-3.jpg",
        "/images/coconut-log-house-4.jpg",
      ],
      amenities: [
        "Thatched roof design",
        "Double bed and sofa-cum-double bed",
        "Ideal for families of 4",
        "Comfortable for senior guests",
      ],
    },
    {
      id: 5,
      name: "Machaan Hut",
      roomType: "Couple Room",
      tariff: "₹7,500 for 2 guests",
      description:
        "Often referred to as the 'tree house' by our guests, the Machaan Hut is an elevated structure perfect for couples. It includes additional space at the ground level for relaxation and can accommodate one extra person.",
      images: [
        "/images/machaan-hut-1.jpg",
        "/images/machaan-hut-2.jpg",
        "/images/machaan-hut-3.jpg",
        "/images/machaan-hut-4.jpg",
      ],
      amenities: [
        "Elevated 'tree house' design",
        "Suitable for couples",
        "Can accommodate 1 extra person",
        "Additional ground-level space",
      ],
    },
    {
      id: 6,
      name: "Loft Huts",
      roomType: "Family Room",
      tariff: "₹11,500 for 4 guests",
      description:
        "Our innovative Loft Huts are elevated structures designed for guests who prefer spacious accommodations. Each hut features a double bed and two additional beds on a mezzanine floor, accessible via an internal staircase, ideal for a family of four.",
      images: [
        "/images/loft-huts-1.jpg",
        "/images/loft-huts-2.jpg",
        "/images/loft-huts-3.jpg",
        "/images/loft-huts-4.jpg",
      ],
      amenities: [
        "Elevated structure with mezzanine floor",
        "Double bed plus two mezzanine beds",
        "Internal staircase access",
        "Ideal for family of 4",
      ],
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
            className="text-3xl md:text-6xl font-serif text-warm-ivory mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Accommodations
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl text-warm-ivory/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Comfort meets nature in our unique eco-friendly lodgings
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
              At Save Farm, we offer a range of unique accommodations that blend comfort with sustainability. Each of
              our lodgings is designed to provide a restful stay while maintaining a deep connection to the natural
              surroundings. From traditional farmer's quarters to elevated tree huts, our accommodations offer an
              authentic experience without sacrificing modern comforts.
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
                  <ImageGallery
                    images={accommodation.images.map((src) => ({
                      src,
                      alt: `Image of ${accommodation.name}`,
                    }))}
                  />
                </div>
                <div className="p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-2xl font-serif text-fern mb-2 sm:mb-0">{accommodation.name}</h3>
                    <span className="inline-block bg-fern/10 text-fern px-3 py-1 rounded-full text-sm font-medium self-start sm:self-auto">
                      {accommodation.roomType}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="text-lg font-semibold text-fern">{accommodation.tariff}</span>
                  </div>

                  <p className="text-natural mb-6">{accommodation.description}</p>

                  <h4 className="text-lg font-medium text-fern mb-3">Amenities</h4>
                  <ul className="space-y-2 mb-6">
                    {accommodation.amenities.map((amenity, i) => (
                      <li key={i} className="flex items-start text-natural">
                        <div className="w-2 h-2 rounded-full bg-fern mt-2 mr-3 flex-shrink-0"></div>
                        <span className="leading-relaxed">{amenity}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild variant="outline" className="border-fern text-fern hover:bg-fern/10 w-full">
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

      {/* <section className="py-10 bg-natural/10" data-scroll-section>
        <div className="container px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif text-fern mb-6">Frequently Asked Questions</h2>
              <p className="text-natural text-lg max-w-2xl mx-auto">
                Find answers to common questions about our accommodations, amenities, and booking policies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-warm-ivory p-6 rounded-sm shadow-sm border-l-4 border-fern">
                <h3 className="text-xl font-serif text-fern mb-3 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-fern/70" />
                  Room Availability
                </h3>
                <p className="text-natural mb-4">
                  Check booking windows, seasonal availability, and how to reserve your stay.
                </p>
              </div>

              <div className="bg-warm-ivory p-6 rounded-sm shadow-sm border-l-4 border-fern">
                <h3 className="text-xl font-serif text-fern mb-3 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-fern/70" />
                  Amenities & Services
                </h3>
                <p className="text-natural mb-4">
                  See what's included—from meals and activities to special accommodations.
                </p>
              </div>

              <div className="bg-warm-ivory p-6 rounded-sm shadow-sm border-l-4 border-fern">
                <h3 className="text-xl font-serif text-fern mb-3 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-fern/70" />
                  Check-in & Policies
                </h3>
                <p className="text-natural mb-4">
                  Key info on check-in times, payment methods, and cancellation rules.
                </p>
              </div>

              <div className="bg-warm-ivory p-6 rounded-sm shadow-sm border-l-4 border-fern">
                <h3 className="text-xl font-serif text-fern mb-3 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-fern/70" />
                  Special Requests
                </h3>
                <p className="text-natural mb-4">
                  Learn about dietary options, accessibility, and other special needs.
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Button asChild variant="outline" className="border-fern text-fern hover:bg-fern/10">
                <Link href="/about#faq">
                  View All FAQs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section> */}

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
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Have Questions About Our Accommodations?</h2>
            <p className="text-lg mb-8 opacity-90">
              Find answers to common questions about our rooms, amenities, booking policies, and more in our
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
