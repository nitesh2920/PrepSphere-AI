'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "How is PrepSphere AI different from other study tools?",
      answer: "PrepSphere AI is specifically built for everyone (students , professionals) preparing for exams or Interviews or want to learn any topic . Unlike generic tools, we provide structured learning paths, progress tracking, interactive quizzes, flashcards, and comprehensive study materials all in one platform. Our system is designed to create educational content that follows proven learning methodologies."
    },
    {
      question: "How does the credit system work?",
      answer: "Each credit generates one complete course with comprehensive study materials including detailed notes, interactive flashcards, practice quizzes, and Q&A sections. Basic users get 5 credits to start, while Pro users receive 50 credits that refresh every month. One credit = one full course with all materials included."
    },
    {
      question: "How many courses can I generate with the Pro plan?",
      answer: "With the Pro plan, you get 50 credits per month, and each credit generates one complete course with all study materials (notes, quizzes, flashcards, and Q&A). Your credits refresh every month, giving you plenty of content for comprehensive exam preparation across multiple subjects."
    },
    {
      question: "What happens when I run out of credits?",
      answer: "When you use all your credits, you'll need to wait for the next billing cycle (for Pro users) or upgrade your plan. Basic users start with 5 free credits, and Pro users get 50 credits that refresh monthly. You can always upgrade to Pro for more credits and advanced features."
    },
    {
      question: "What types of subjects and exams does PrepSphere AI support?",
      answer: "PrepSphere AI supports a wide range of subjects including STEM fields, humanities, business, languages, professional certifications, and more. Whether you're preparing for academic exams, professional certifications, or skill development, our AI can create relevant study materials."
    },
    {
      question: "Can I export my study materials?",
      answer: "Export functionality is coming soon! Pro users will be able to export their notes, quizzes, and flashcards to PDF format for offline studying. You'll also be able to print your materials or share them with study groups."
    },
    {
      question: "How does the progress tracking work?",
      answer: "Our platform tracks your learning progress across all materials. You can see completion rates, quiz scores, areas that need improvement"
    },
    {
      question: "Can I collaborate with other students?",
      answer: "Currently, PrepSphere AI is designed for individual learning. However, you can export and share your study materials with classmates. We're working on collaboration features for future updates."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <HelpCircle size={16} />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-outfit">
            Got{' '}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Questions?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-outfit">
            Find answers to common questions about PrepSphere AI and how it can transform your learning experience.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={itemVariants} className="mb-4">
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <motion.button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  >
                    <h3 className="text-lg font-normal text-gray-900 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 cursor-pointer"
                    >
                      {openIndex === index ? (
                        <Minus size={20} className="text-orange-600 dark:text-orange-400" />
                      ) : (
                        <Plus size={20} className="text-orange-600 dark:text-orange-400" />
                      )}
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 mt-2">
                          <motion.p
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            className="text-gray-600 dark:text-gray-300 leading-relaxed"
                          >
                            {faq.answer}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default FAQSection