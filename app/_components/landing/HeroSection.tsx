'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, BookOpen, Brain, Zap } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useScrollAnimation, fadeInUp, staggerContainer } from '@/app/_hooks/useScrollAnimation'

const HeroSection = () => {
  const { isSignedIn } = useUser()
  const { ref: heroRef, controls } = useScrollAnimation({ threshold: 0.2 })

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const floatingIcons = [
    { icon: BookOpen, delay: 0, x: 100, y: 50 },
    { icon: Brain, delay: 0.5, x: -80, y: 80 },
    { icon: Zap, delay: 1, x: 120, y: -60 },
    { icon: Sparkles, delay: 1.5, x: -100, y: -40 }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-orange-950/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400/20 dark:bg-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-400/20 dark:bg-amber-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute hidden lg:block"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.1,
              scale: 1,
              x: [0, item.x * 0.5, item.x, item.x * 0.5, 0],
              y: [0, item.y * 0.5, item.y, item.y * 0.5, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + index * 20}%`,
              top: `${20 + index * 15}%`
            }}
          >
            <item.icon size={40} className="text-orange-500 dark:text-orange-400" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium font-outfit">
              <img src="/logo.svg" alt="PrepSphere AI" className="w-4 h-4 dark:hidden" />
              <img src="/logo-dark.svg" alt="PrepSphere AI" className="w-4 h-4 hidden dark:block" />
              Smart Learning Platform
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold text-gray-900 dark:text-white mb-6 leading-tight font-outfit"
          >
            Master Any Subject with{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
              PrepSphere AI
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-outfit"
          >
            Create personalized study materials, practice quizzes, and comprehensive notes.
            Your complete learning companion for academic excellence.
          </motion.p>

          {/* Credit Highlight */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 text-orange-700 dark:text-orange-400 px-6 py-3 rounded-full text-lg font-medium border border-orange-200 dark:border-orange-800">
              <Zap className="w-5 h-5" />
              Start with 5 Free Credits • Upgrade to 50 Credits
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 max-w-2xl mx-auto"
          >
            {isSignedIn ? (
              <Link href="/dashboard" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 px-12 py-5 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-outfit"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <>
                <Link href="/sign-up" className="w-full sm:w-auto">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 px-12 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-outfit"
                    >
                      Get Started
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/sign-in" className="w-full sm:w-auto">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 px-12 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 font-outfit"
                    >
                      Book Demo
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => {
          const featuresSection = document.getElementById('features')
          if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' })
          }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center hover:border-orange-500 dark:hover:border-orange-400 transition-colors duration-300">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 hover:bg-orange-500 dark:hover:bg-orange-400 transition-colors duration-300"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection