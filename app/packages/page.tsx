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
      name: "One Day Farm Experience",
      description: "A wholesome single-day retreat designed for guests looking to enjoy authentic farm life near Mumbai.",
      image: "/images/day-tour.jpg",
      inclusions: [
        "1 Veg. meal",
        "1 Breakfast",
        "Guided Farm Tour",
        "Rural Life Skill Activities"
      ],
      duration: "9:30 am to 3:30 pm same day",
      price: "₹1,000 per person",
      priceGroup: "Children up to 4 yrs (1 per 2 guests): Free | 4–8 yrs: ₹500"
    },
    {
      id: 2,
      name: "Farmstay - Double Occupancy",
      description: "Perfect for couples or two guests seeking peace and connection amidst serene farmlands.",
      image: "/images/overnight-stay.jpg",
      inclusions: [
        "2 Meals",
        "1 Breakfast",
        "Guided Farm Tour",
        "Rural Life Skill Activities"
      ],
      duration: "Check-in 1:00 pm to 11:00 am next day",
      price: "₹7,500 for 2 guests",
      priceGroup: "1 child (up to 8 yrs) per room: Complimentary"
    },
    {
      id: 3,
      name: "Farmstay - Family Room",
      description: "Designed for families to unwind and bond through shared rural experiences in comfort.",
      image: "/images/weekend-retreat.jpg",
      inclusions: [
        "2 Meals",
        "1 Breakfast",
        "Guided Farm Tour",
        "Rural Life Skill Activities"
      ],
      duration: "Check-in 1:00 pm to 11:00 am next day",
      price: "₹11,500 for 4 guests",
      priceGroup: "Extra person: ₹2,000 per night | 1 child (up to 8 yrs) free per room"
    }
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
            className="text-4xl md:text-6xl font-serif text-warm-ivory mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Packages
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl text-warm-ivory/90 max-w-2xl mx-auto"
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
        Booking Guidelines
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Left Column - Booking Info */}
        <div>
          <h3 className="text-xl font-serif text-fern mb-4">How to Book</h3>
          <p className="text-natural mb-6">
            Booking your stay at Save Farm is simple. Contact us through our website, email, or phone to check
            availability and confirm your reservation. We recommend booking at least two weeks in advance for weekend
            stays.
          </p>
          <p className="text-natural mb-6">
            A 50% advance payment is required to secure your slot. Balance payment can be made on arrival via UPI,
            bank transfer, or cash.
          </p>
          <p className="text-natural">
            For group bookings (10+ guests), please reach out to us directly for customized pricing and assistance.
          </p>
        </div>

        {/* Right Column - Bullet List */}
        <div>
          <h3 className="text-xl font-serif text-fern mb-4">Policies & Essentials</h3>
          <ul className="space-y-2">
            <li className="flex items-baseline gap-3">
              <span className="w-2 h-2 bg-fern rounded-full mt-1 shrink-0" />
              <span className="text-natural leading-relaxed">
                Save Farm is a farmstay offering a rural experience — not a hotel or resort.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-2 h-2 bg-fern rounded-full mt-1 shrink-0" />
              <span className="text-natural leading-relaxed">
                Alcohol and loud music are strictly not allowed.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-2 h-2 bg-fern rounded-full mt-1 shrink-0" />
              <span className="text-natural leading-relaxed">
                Meal and activity timings are fixed. Dinner is served at 8:30 pm.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-2 h-2 bg-fern rounded-full mt-1 shrink-0" />
              <span className="text-natural leading-relaxed">
                Vegetarian meals are included. Non-vegetarian options are available at extra cost.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-2 h-2 bg-fern rounded-full mt-1 shrink-0" />
              <span className="text-natural leading-relaxed">
                All meals are home-cooked using seasonal and local ingredients.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-2 h-2 bg-fern rounded-full mt-1 shrink-0" />
              <span className="text-natural leading-relaxed">
                WiFi and cable may occasionally be unstable due to our rural location.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="w-2 h-2 bg-fern rounded-full mt-1 shrink-0" />
              <span className="text-natural leading-relaxed">
                All listed prices are inclusive of GST.
              </span>
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
