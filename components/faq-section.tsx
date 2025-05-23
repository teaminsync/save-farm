"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategoryProps {
  title: string
  faqs: FAQItem[]
}

interface FAQSectionProps {
  categories: FAQCategoryProps[]
}

function FAQCategory({ title, faqs }: FAQCategoryProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-serif text-fern mb-6">{title}</h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-natural/20 pb-4">
            <button
              className="w-full flex justify-between items-center text-left focus:outline-none group"
              onClick={() => toggleQuestion(index)}
              aria-expanded={expandedIndex === index}
              data-cursor-text={expandedIndex === index ? "Collapse" : "Expand"}
            >
              <span className="text-lg font-medium text-fern group-hover:text-fern/80 transition-colors">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-fern flex-shrink-0 ml-4"
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className="pt-4 text-natural whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  ></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FAQSection({ categories }: FAQSectionProps) {
  return (
    <section className="py-20 bg-warm-ivory" id="faq">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-fern mb-12 text-center">Frequently Asked Questions</h2>

          {categories.map((category, index) => (
            <FAQCategory key={index} title={category.title} faqs={category.faqs} />
          ))}
        </div>
      </div>
    </section>
  )
}
