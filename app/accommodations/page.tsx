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
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549471/shetkari-niwas-1_lxserj.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549470/shetkari-niwas-2_fxxvrm.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549480/shetkari-niwas-3_j0ur7u.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549480/shetkari-niwas-4_ipzry9.webp",
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
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549484/tulasi-vrindavan-1_oq4wsc.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549485/tulasi-vrindavan-2_wnlql5.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549484/tulasi-vrindavan-3_zwdvzm.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549486/tulasi-vrindavan-4_lluazj.webp",
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
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549515/bamboo-hut-1_cvfyfq.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549512/bamboo-hut-2_kx47ly.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549515/bamboo-hut-3_phqqlg.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549513/bamboo-hut-4_tg2ofs.webp",
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
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549515/coconut-log-house-1_fxhwud.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549517/coconut-log-house-2_k0eqh9.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549520/coconut-log-house-3_lham4n.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549517/coconut-log-house-4_mlv3ff.webp",
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
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549493/machaan-hut-1_jptqes.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549505/machaan-hut-2_wdsqkg.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549499/machaan-hut-3_nlkgzq.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549508/machaan-hut-4_wozqcn.webp",
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
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549496/loft-huts-1_eiv0mc.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549494/loft-huts-2_pg44lh.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549504/loft-huts-3_w8fisu.webp",
        "https://res.cloudinary.com/ducsps1cw/image/upload/v1748549497/loft-huts-4_i0ikmz.webp",
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
            src="https://res.cloudinary.com/ducsps1cw/image/upload/v1748522040/accommodations-hero_s9wqox.webp"
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
