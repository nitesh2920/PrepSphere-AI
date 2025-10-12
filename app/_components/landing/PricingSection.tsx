'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles, Crown, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

const PricingSection = () => {
  const { isSignedIn } = useUser()

  const plans = [
    {
      name: "Basic",
      price: "₹ 0",
      period: "forever",
      description: "Perfect for getting started with AI-powered learning",
      icon: Sparkles,
      gradient: "from-gray-500 to-gray-600",
      popular: false,
      credits: 5,
      features: [
        "5 Course Generations",
        "Basic Study Materials",
        "Notes & Flashcards Generation",
        "Quiz Generation"
        // "Email Support"
      ],
      cta: isSignedIn ? "Current Plan" : "Get Started Free",
      ctaLink: isSignedIn ? "/dashboard" : "/sign-up"
    },
    {
      name: "Pro",
      price: "₹ 199",
      period: "per month",
      description: "Unlimited learning with premium AI features",
      icon: Crown,
      gradient: "from-orange-500 to-orange-600 dark:from-orange-500 dark:to-orange-600",
      popular: true,
      credits: 50,
      features: [
        "50 Course Generations",
        "All Study Materials",
        "Advanced Notes & Flashcards",
        "Q&A Generation (Coming Soon)",
        "Export Options (Coming Soon)",
        "Custom Study Plans (Coming Soon)"
      ],
      cta: "Upgrade to Pro",
      ctaLink: isSignedIn ? "/dashboard/upgrade" : "/sign-up"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap size={16} />
            Credit-Based Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-outfit">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 bg-clip-text text-transparent">
              Learning Plan
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-outfit">
            Start with 5 free credits, upgrade to Pro for 50 credits per month. Each credit generates a complete course with study materials.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className={`relative flex flex-col h-full ${plan.popular ? 'ring-2 ring-orange-500 shadow-2xl scale-105' : 'shadow-lg'} transition-all duration-300 hover:shadow-2xl`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-500 dark:to-amber-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center mx-auto mb-4`}
                  >
                    <plan.icon size={28} className="text-white" />
                  </motion.div>

                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </CardTitle>

                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">/{plan.period}</span>
                  </div>

                  {/* Credits Display */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
                    plan.popular 
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                  }`}>
                    <Zap className="w-4 h-4" />
                    <span className="font-semibold">
                      {plan.credits} {plan.credits === 1 ? 'Credit' : 'Credits'}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0 flex-1 flex flex-col">
                  <div className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, featureIndex) => {
                      const isComingSoon = feature.includes('(Coming Soon)')
                      const featureText = feature.replace(' (Coming Soon)', '')

                      return (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: featureIndex * 0.1, duration: 0.4 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check size={12} className="text-white" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 flex-1">
                            {featureText}
                            {isComingSoon && (
                              <span className="ml-2 text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full">
                                Coming Soon
                              </span>
                            )}
                          </span>
                        </motion.div>
                      )
                    })}
                  </div>

                  <div className="mt-auto">
                    <Link href={plan.ctaLink}>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          className={`w-full py-3 text-lg font-medium rounded-xl transition-all duration-300 ${plan.popular
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-500 dark:to-amber-500 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-600 dark:hover:to-amber-600 text-white shadow-lg hover:shadow-xl'
                            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                            }`}
                        >
                          {plan.cta}
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Credit Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl p-8 border border-orange-200 dark:border-orange-800">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Zap size={16} />
                How Credits Work
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                One Credit = One Complete Course
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Each credit generates a comprehensive course with all study materials included
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: "📝", title: "Detailed Notes", desc: "Chapter-wise comprehensive notes" },
                { icon: "🃏", title: "Flashcards", desc: "Interactive flashcards for quick review" },
                { icon: "📊", title: "Quizzes", desc: "Practice quizzes with instant feedback" },
                { icon: "❓", title: "Q&A", desc: "Common questions with detailed answers" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="text-center"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pro members get 50 credits refreshed every month • No hidden fees • Cancel anytime
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PricingSection