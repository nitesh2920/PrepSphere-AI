'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, X, Target, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

const ComparisonSection = () => {
  const comparisons = [
    {
      feature: "Structured Learning Path",
      prepSphere: true,
      chatgpt: false,
      description: "Organized curriculum vs random responses"
    },
    {
      feature: "Progress Tracking",
      prepSphere: true,
      chatgpt: false,
      description: "Monitor your learning journey"
    },
    {
      feature: "Interactive Quizzes",
      prepSphere: true,
      chatgpt: false,
      description: "Test knowledge with instant feedback"
    },
    {
      feature: "Generate Flashcards",
      prepSphere: true,
      chatgpt: false,
      description: "Spaced repetition for better retention"
    },
    {
      feature: "Generate Notes",
      prepSphere: true,
      chatgpt: false,
      description: "Structured, downloadable study guides"
    },
    {
      feature: "Multi-format Learning",
      prepSphere: true,
      chatgpt: false,
      description: "Notes, quizzes, flashcards, Questions & answers in one place"
    }
  ]

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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4">
            <Target size={14} className="sm:w-4 sm:h-4" />
            Why Choose PrepSphere AI
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 font-outfit px-4 sm:px-0">
            Why Choose PrepSphere AI Over{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
              Generic Solutions
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-outfit px-4 sm:px-0">
            Discover how PrepSphere AI's specialized learning tools outperform
            general-purpose solutions for serious students and professionals.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* PrepSphere AI Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 border-2 border-orange-200 dark:border-orange-700/50">
                <CardHeader className="text-center pb-4 sm:pb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 p-2 sm:p-3">
                    <Image
                      src="/logo-dark.svg"
                      alt="PrepSphere AI"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain sm:w-10 sm:h-10"
                    />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    PrepSphere AI
                  </CardTitle>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    Purpose-built for learning success
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "Structured learning paths",
                      "Progress tracking & analytics",
                      "Interactive study materials",
                      "Exam-focused content",
                      "Multi-format learning tools"
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Generic ChatGPT Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full bg-gray-100 dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={28} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    Generic AI
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">
                    General-purpose AI assistant
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "Random, unstructured responses",
                      "No progress tracking",
                      "Text-only interactions",
                      "Generic, unfocused content",
                      "Limited learning tools"
                    ].map((limitation, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <X size={14} className="text-white" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{limitation}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Detailed Comparison Table */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Detailed Feature Comparison
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Feature</th>
                      <th className="text-center py-4 px-6 font-semibold text-orange-600 dark:text-orange-400">PrepSphere AI</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-600 dark:text-gray-400">ChatGPT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((item, index) => (
                      <motion.tr
                        key={index}
                        variants={itemVariants}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{item.feature}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          {item.prepSphere ? (
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                              <Check size={16} className="text-white" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                              <X size={16} className="text-white" />
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {item.chatgpt ? (
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                              <Check size={16} className="text-white" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                              <X size={16} className="text-white" />
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ComparisonSection