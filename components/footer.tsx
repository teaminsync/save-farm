// import Link from "next/link"
// import Image from "next/image"
// import { Facebook, Instagram, Youtube, Phone } from "lucide-react"
// import { motion } from "framer-motion"

// export default function Footer() {
//   return (
//     <footer className="bg-fern text-warm-ivory py-12" data-scroll-section>
//       <div className="container px-4 mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Logo and About */}
//           <div className="md:col-span-1">
//             <div className="flex items-center mb-4">
//               <div className="relative w-10 h-10">
//                 <Image src="/images/save-farm-logo2.svg" alt="Save Farm Logo" fill className="object-contain" />
//               </div>
//               <span className="ml-2 font-serif text-xl">Save Farm</span>
//             </div>
//             <p className="text-warm-ivory/80 text-sm mb-4">
//               Reconnect with nature in our sustainable luxury farm retreat.
//             </p>
//             <div className="flex space-x-4">
//               <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
//                 <Link href="#" className="text-warm-ivory hover:text-warm-ivory/70 transition-colors">
//                   <Facebook className="h-5 w-5" />
//                   <span className="sr-only">Facebook</span>
//                 </Link>
//               </motion.div>
//               <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
//                 <Link href="#" className="text-warm-ivory hover:text-warm-ivory/70 transition-colors">
//                   <Instagram className="h-5 w-5" />
//                   <span className="sr-only">Instagram</span>
//                 </Link>
//               </motion.div>
//               <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
//                 <Link href="https://wa.me/919921177335" className="text-warm-ivory hover:text-warm-ivory/70 transition-colors">
//                   <Phone className="h-5 w-5" />
//                   <span className="sr-only">WhatsApp</span>
//                 </Link>
//               </motion.div>
//               <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
//                 <Link href="https://www.youtube.com/yourchannel" className="text-warm-ivory hover:text-warm-ivory/70 transition-colors">
//                   <Youtube className="h-5 w-5" />
//                   <span className="sr-only">YouTube</span>
//                 </Link>
//               </motion.div>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="font-serif text-lg mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link href="/" className="text-warm-ivory/80 hover:text-warm-ivory transition-colors text-sm">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/about" className="text-warm-ivory/80 hover:text-warm-ivory transition-colors text-sm">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/activities" className="text-warm-ivory/80 hover:text-warm-ivory transition-colors text-sm">
//                   Activities
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/accommodations"
//                   className="text-warm-ivory/80 hover:text-warm-ivory transition-colors text-sm"
//                 >
//                   Accommodations
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/packages" className="text-warm-ivory/80 hover:text-warm-ivory transition-colors text-sm">
//                   Packages
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/contact" className="text-warm-ivory/80 hover:text-warm-ivory transition-colors text-sm">
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="font-serif text-lg mb-4">Contact Us</h3>
//             <address className="not-italic">
//               <p className="text-warm-ivory/80 text-sm mb-2">
//                 Rampur Post Gholvad
//                 <br />
//                 Dahanu
//                 <br />
//                 Maharashtra 401702
//               </p>
//               <p className="text-warm-ivory/80 text-sm mb-2">Phone: +91 99211 77335</p>
//               <p className="text-warm-ivory/80 text-sm">Email: aditya@savefarm.in</p>
//             </address>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h3 className="font-serif text-lg mb-4">Newsletter</h3>
//             <p className="text-warm-ivory/80 text-sm mb-4">
//               Subscribe to our newsletter for updates and special offers.
//             </p>
//             <form className="flex">
//               <input
//                 type="email"
//                 placeholder="Your email"
//                 className="px-3 py-2 text-sm bg-warm-ivory/10 border border-warm-ivory/20 rounded-l-md focus:outline-none focus:ring-1 focus:ring-warm-ivory/50 text-warm-ivory placeholder:text-warm-ivory/50 w-full"
//               />
//               <button
//                 type="submit"
//                 className="bg-warm-ivory text-fern px-3 py-2 rounded-r-md text-sm font-medium hover:bg-warm-ivory/90 transition-colors"
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>

//         <div className="border-t border-warm-ivory/20 mt-12 pt-6 text-center">
//           <p className="text-warm-ivory/70 text-sm">
//             &copy; {new Date().getFullYear()} Save Farm. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   )
// }
'use client'

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Phone } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = async (e) => {
    e.preventDefault()

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.")
      return
    }

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const result = await res.json()

      if (result.result === "success") {
        alert("Subscribed successfully!")
        setEmail("")
      } else {
        alert("Subscription failed. Please try again.")
      }
    } catch (err) {
      console.error(err)
      alert("Error connecting to server. Please try again later.")
    }
  }

  return (
    <footer className="bg-fern text-warm-ivory py-12" data-scroll-section>
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="relative w-10 h-10">
                <Image src="/images/save-farm-logo2.svg" alt="Save Farm Logo" fill className="object-contain" />
              </div>
              <span className="ml-2 font-serif text-xl">Save Farm</span>
            </div>
            <p className="text-warm-ivory/80 text-sm mb-4">
              Reconnect with nature in our sustainable luxury farm retreat.
            </p>
            <div className="flex space-x-4">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link href="#" className="text-warm-ivory hover:text-warm-ivory/70 transition-colors">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link href="#" className="text-warm-ivory hover:text-warm-ivory/70 transition-colors">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link href="https://wa.me/919921177335" className="text-warm-ivory hover:text-warm-ivory/70 transition-colors">
                  <Phone className="h-5 w-5" />
                  <span className="sr-only">WhatsApp</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link href="https://www.youtube.com/yourchannel" className="text-warm-ivory hover:text-warm-ivory/70 transition-colors">
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-warm-ivory/80 hover:text-warm-ivory transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-warm-ivory/80 hover:text-warm-ivory transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-warm-ivory/80 hover:text-warm-ivory transition-colors text-sm">
                  Activities
                </Link>
              </li>
              <li>
                <Link href="/accommodations" className="text-warm-ivory/80 hover:text-warm-ivory transition-colors text-sm">
                  Accommodations
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-warm-ivory/80 hover:text-warm-ivory transition-colors text-sm">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-warm-ivory/80 hover:text-warm-ivory transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="text-warm-ivory/80 text-sm mb-2">
                Rampur Post Gholvad
                <br />
                Dahanu
                <br />
                Maharashtra 401702
              </p>
              <p className="text-warm-ivory/80 text-sm mb-2">Phone: +91 99211 77335</p>
              <p className="text-warm-ivory/80 text-sm">Email: aditya@savefarm.in</p>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg mb-4">Newsletter</h3>
            <p className="text-warm-ivory/80 text-sm mb-4">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <form className="flex" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="px-3 py-2 text-sm bg-warm-ivory/10 border border-warm-ivory/20 rounded-l-md focus:outline-none focus:ring-1 focus:ring-warm-ivory/50 text-warm-ivory placeholder:text-warm-ivory/50 w-full"
              />
              <button
                type="submit"
                className="bg-warm-ivory text-fern px-3 py-2 rounded-r-md text-sm font-medium hover:bg-warm-ivory/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-warm-ivory/20 mt-12 pt-6 text-center">
          <p className="text-warm-ivory/70 text-sm">
            &copy; {new Date().getFullYear()} Save Farm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
