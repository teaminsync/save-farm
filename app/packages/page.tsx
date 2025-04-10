"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Check } from "lucide-react"

import LocomotiveLayout from "@/components/locomotive-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PackagesPage() {
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

  const packages = [
    {
      id: 1,
      name: "Day Tour Package",
      description: "Perfect for those who want to experience Save Farm for a day without an overnight stay.",
      image: "/images/day-tour.jpg",
      inclusions: ["Farm tour", "Breakfast", "Lunch", "One activity of your choice"],
      duration: "9:00 am to 3:30 pm",
      price: "₹1,500 per person",
      priceGroup: "₹1,200 per person for groups of 5+",
    },
    {
      id: 2,
      name: "Overnight Stay Package",
      description:
        "Immerse yourself in the Save Farm experience with an overnight stay in one of our unique accommodations.",
      image: "/images/overnight-stay.jpg",
      inclusions: ["Farm tour", "Breakfast", "Two meals", "Accommodation", "Two activities of your choice"],
      duration: "From 12:00 pm to 11:00 am the next day",
      price: "Starting from ₹4,500 per person",
      priceGroup: "Starting from ₹4,000 per person for groups of 5+",
    },
    {
      id: 3,
      name: "Weekend Retreat Package",
      description: "Escape the city for a full weekend of relaxation, adventure, and connection with nature.",
      image: "/images/weekend-retreat.jpg",
      inclusions: [
        "Farm tour",
        "All meals",
        "Two-night accommodation",
        "All activities",
        "Special farm-to-table dinner",
      ],
      duration: "Friday 2:00 pm to Sunday 4:00 pm",
      price: "Starting from ₹9,500 per person",
      priceGroup: "Starting from ₹8,500 per person for groups of 5+",
    },
  ]

  return (
    <LocomotiveLayout>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden" data-scroll-section>
        <div className="absolute inset-0 z-0">
          <Image src="/images/packages-hero.jpg" alt="Save Farm packages" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-fern/30" />
        </div>

        <div className="container relative z-10 text-center px-4">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-serif text-warm-ivory mb-6 text-center px-4 max-w-4xl mx-auto leading-tight break-words"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Packages
          </motion.h1>


          <motion.p
            className="text-lg md:text-xl text-warm-ivory/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Choose the perfect experience for your Save Farm visit
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
              Curated Experiences
            </motion.h2>

            <motion.p
              className="text-natural text-lg mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We've designed our packages to offer you the best of Save Farm, whether you're visiting for a day or
              staying for a weekend. Each package includes carefully selected activities and amenities to ensure you
              have a memorable and enriching experience. Choose the option that best suits your schedule and
              preferences, and let us take care of the rest.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-fern/5" data-scroll-section>
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <div className="relative h-60">
                    <Image
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-fern">{pkg.name}</CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-fern mb-2">Inclusions</h4>
                      <ul className="space-y-1">
                        {pkg.inclusions.map((inclusion, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-4 w-4 text-fern mr-2 mt-1 shrink-0" />
                            <span className="text-natural text-sm">{inclusion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-fern mb-2">Duration</h4>
                      <p className="text-natural text-sm">{pkg.duration}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-fern mb-2">Pricing</h4>
                      <p className="text-natural text-sm font-medium">{pkg.price}</p>
                      <p className="text-natural text-sm">{pkg.priceGroup}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-fern hover:bg-fern/90 text-warm-ivory">
                      <Link href="/contact">
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Info Section */}
      <section className="py-20 bg-warm-ivory" data-scroll-section>
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-serif text-fern mb-8 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Booking Information
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <h3 className="text-xl font-serif text-fern mb-4">How to Book</h3>
                <p className="text-natural mb-6">
                  Booking your Save Farm experience is easy. Simply contact us through our website, email, or phone to
                  check availability and make a reservation. We recommend booking at least two weeks in advance,
                  especially for weekend stays during peak season.
                </p>
                <p className="text-natural mb-6">
                  A 50% deposit is required to confirm your booking, with the balance due upon arrival. We accept all
                  major credit cards, bank transfers, and cash payments.
                </p>
                <p className="text-natural">
                  For group bookings of 10 or more people, please contact us directly for special rates and
                  arrangements.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-serif text-fern mb-4">Cancellation Policy</h3>
                <p className="text-natural mb-6">
                  We understand that plans can change. Our cancellation policy is as follows:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-fern mt-2 mr-2"></div>
                    <span className="text-natural">
                      Cancellations made more than 7 days before arrival: Full refund
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-fern mt-2 mr-2"></div>
                    <span className="text-natural">Cancellations made 3-7 days before arrival: 50% refund</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-fern mt-2 mr-2"></div>
                    <span className="text-natural">Cancellations made less than 3 days before arrival: No refund</span>
                  </li>
                </ul>
              </div>
            </motion.div>
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
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready to Book Your Save Farm Experience?</h2>
            <p className="text-lg mb-8 opacity-90">Contact us today to check availability and make your reservation.</p>
            <Button asChild className="bg-warm-ivory text-fern hover:bg-warm-ivory/90">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </LocomotiveLayout>
  )
}
