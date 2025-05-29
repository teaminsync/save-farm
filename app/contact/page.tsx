"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Loader2, Mail, MapPin, Phone } from "lucide-react"

import LocomotiveLayout from "@/components/locomotive-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

// Define types for form data and errors
interface FormData {
  name: string
  email: string
  phone: string
  message: string
  visitors: number | string
  package: string
  room: string
}

interface FormErrors {
  [key: string]: string
}

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    visitors: 1,
    package: "",
    room: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Form section animation
    gsap.fromTo(
      formRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        ease: "power3.out",
      },
    )
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required" // Phone is required
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid" // Email validation only if it's filled
    }

    if (!formData.visitors) {
      newErrors.visitors = "Number of visitors is required"
    }

    if (!formData.package) {
      newErrors.package = "Package selection is required"
    }

    if (!formData.room) {
      newErrors.room = "Room selection is required"
    }

    if (formData.message && formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters" // Example of optional validation if desired
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzUKlQ_FrTDKqi4qud7qrzOF1jXlpQyTfE4AvyuDrLLHPPL80cEpIH5uJuS6p0c3NTrBg/exec",
        {
          method: "POST",
          body: JSON.stringify(formData),
        },
      )

      const result = await response.json()

      if (result.result === "success") {
        toast({
          title: "Message Sent Successfully",
          description: "Thank you for contacting Save Farm. We'll get back to you soon!",
          variant: "success",
          duration: 4000, // 4 seconds for contact form
        })

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          visitors: 1,
          package: "",
          room: "",
        })
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again or contact us directly.",
          variant: "destructive",
          duration: 4000, // 4 seconds for contact form
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Error",
        description: "Unable to submit form. Please check your internet connection.",
        variant: "destructive",
        duration: 4000, // 4 seconds for contact form
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <LocomotiveLayout>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden" data-scroll-section>
        <div className="absolute inset-0 z-0">
          <Image src="/images/contact-hero.webp" alt="Save Farm contact" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-fern/30" />
        </div>

        <div className="container relative z-10 text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-serif text-warm-ivory mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Contact Us
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl text-warm-ivory/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Get in touch to book your stay or learn more about Save Farm
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-warm-ivory" data-scroll-section ref={formRef}>
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-serif text-fern mb-8">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-natural">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border-natural/20 focus:border-fern ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {/* Email Field */}
                  <div className="space-y-2 md:col-span-3">
                    {" "}
                    {/* Email takes up 3/5 of the space */}
                    <Label htmlFor="email" className="text-natural">
                      Email (Optional)
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full border-natural/20 focus:border-fern ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2 md:col-span-2">
                    {" "}
                    {/* Phone takes up 2/5 of the space */}
                    <Label htmlFor="phone" className="text-natural">
                      Phone
                    </Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-14 border-natural/20 focus:border-fern"
                        required // Make phone number required
                      />
                      {/* Adding +91 inside the input field */}
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-natural">+91</span>
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {/* Number of Visitors Field */}
                  <div className="space-y-2 md:col-span-1">
                    {" "}
                    {/* 1 part out of 5 */}
                    <Label htmlFor="visitors" className="text-natural">
                      No. of Visitors
                    </Label>
                    <select
                      id="visitors"
                      name="visitors"
                      value={formData.visitors}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 placeholder:text-muted-foreground focus:border-fern focus:ring-fern"
                    >
                      <option value="">Select Visitors</option> {/* Empty option as the default */}
                      {[...Array(15)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                    {errors.visitors && <p className="text-red-500 text-sm">{errors.visitors}</p>}
                  </div>

                  {/* Select Package Field */}
                  <div className="space-y-2 md:col-span-2">
                    {" "}
                    {/* 2 parts out of 5 */}
                    <Label htmlFor="package" className="text-natural">
                      Select Package
                    </Label>
                    <select
                      id="package"
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 placeholder:text-muted-foreground focus:border-fern focus:ring-fern"
                    >
                      <option value="">Select Package</option> {/* Empty option as the default */}
                      <option value="One Day Farm Experience">One Day Farm Experience</option>
                      <option value="Farmstay - Double Occupancy">Farmstay - Double Occupancy</option>
                      <option value="Farmstay - Family Room">Farmstay - Family Room</option>
                    </select>
                    {errors.package && <p className="text-red-500 text-sm">{errors.package}</p>}
                  </div>

                  {/* Select Room Field */}
                  <div className="space-y-2 md:col-span-2">
                    {" "}
                    {/* 2 parts out of 5 */}
                    <Label htmlFor="room" className="text-natural">
                      Select Room
                    </Label>
                    <select
                      id="room"
                      name="room"
                      value={formData.room}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 placeholder:text-muted-foreground focus:border-fern focus:ring-fern"
                    >
                      <option value="">Select Room</option> {/* Empty option as the default */}
                      <option value="Shetkari Niwas">Shetkari Niwas</option>
                      <option value="Tulasi Vrindawan">Tulasi Vrindawan</option>
                      <option value="Bamboo Hut">Bamboo Hut</option>
                      <option value="Coconut Log House">Coconut Log House</option>
                      <option value="Machaan Hut">Machaan Hut</option>
                      <option value="Loft Huts">Loft Huts</option>
                    </select>
                    {errors.room && <p className="text-red-500 text-sm">{errors.room}</p>}
                  </div>
                </div>

                <div className="space-y-2 md:col-span-5">
                  <Label htmlFor="message" className="text-natural">
                    Message (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-3 pr-10 py-2 border-2 border-natural/20 focus:border-fern focus:ring-2 focus:ring-fern"
                    placeholder="Enter your message"
                  />
                  {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  className="bg-fern hover:bg-fern/90 text-warm-ivory w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-serif text-fern mb-8">Contact Information</h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-fern mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-fern mb-2">Address</h3>
                    <p className="text-natural">
                      Save Farm
                      <br />
                      Rampur Post Gholvad
                      <br />
                      Dahanu
                      <br />
                      Maharashtra 401702
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-fern mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-fern mb-2">Phone</h3>
                    <p className="text-natural">
                      <a
                        href="https://wa.me/917020366302"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-fern"
                      >
                        +91 70203 66302
                      </a>
                    </p>
                    <p className="text-natural">
                      <a
                        href="https://wa.me/919921177335"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-fern"
                      >
                        +91 99211 77335
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-fern mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-fern mb-2">Email</h3>
                    <p className="text-natural">
                      <a href="mailto:aditya@savefarm.in" className="hover:text-fern">
                        aditya@savefarm.in
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-12">
                <h3 className="text-lg font-medium text-fern mb-4">Find Us</h3>
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3747.2989236789117!2d72.74268467495303!3d20.079787419695354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7284df5987c3d%3A0xcb969bfd2871a816!2sSave%20Farm%20-%20Tarpa!5e0!3m2!1sen!2sin!4v1744289177571!5m2!1sen!2sin"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute top-0 left-0 w-full h-full border-0"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </LocomotiveLayout>
  )
}
