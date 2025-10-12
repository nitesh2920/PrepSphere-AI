'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, BookOpen, Brain, Zap } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useSmoothScroll } from '@/app/_hooks/useSmoothScroll'


const HeroSection = () => {
  const { isSignedIn } = useUser()
  const { scrollToElement } = useSmoothScroll()

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

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-16 sm:py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium font-outfit">
              <img src="/logo.svg" alt="PrepSphere AI" className="w-3 h-3 sm:w-4 sm:h-4 dark:hidden" />
              <img src="/logo-dark.svg" alt="PrepSphere AI" className="w-3 h-3 sm:w-4 sm:h-4 hidden dark:block" />
              Smart Learning Platform
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight font-outfit px-2 sm:px-0"
          >
            Master Any Subject with{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
              PrepSphere AI
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed font-outfit px-4 sm:px-0"
          >
            Create personalized study materials, practice quizzes, and comprehensive notes.
            Your complete learning companion for academic excellence.
          </motion.p>

          {/* Credit Highlight */}
          <motion.div
            variants={itemVariants}
            className="mb-6 sm:mb-8 px-4 sm:px-0"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 text-orange-700 dark:text-orange-400 px-3 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-medium border border-orange-200 dark:border-orange-800">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-center">Start with 5 Free Credits • Upgrade to 50 Credits</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0"
          >
            {isSignedIn ? (
              <Link href="/dashboard" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 px-8 sm:px-16 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-outfit min-w-0 sm:min-w-[280px]"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 sm:ml-3" size={20} />
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <Link href="/sign-up" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 px-8 sm:px-16 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-outfit min-w-0 sm:min-w-[280px]"
                  >
                    Get Started
                    <ArrowRight className="ml-2 sm:ml-3" size={20} />
                  </Button>
                </motion.div>
              </Link>
            )}
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => scrollToElement('#features', 80)}
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