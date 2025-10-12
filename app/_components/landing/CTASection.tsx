'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, BookOpen, Brain, Zap } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

const CTASection = () => {
  const { isSignedIn } = useUser()

  const floatingElements = [
    { icon: BookOpen, delay: 0, x: 80, y: 40 },
    { icon: Brain, delay: 0.5, x: -60, y: 60 },
    { icon: Zap, delay: 1, x: 100, y: -40 },
    { icon: Sparkles, delay: 1.5, x: -80, y: -30 }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-orange-500 via-amber-500 to-red-500 dark:from-orange-600 dark:via-amber-600 dark:to-red-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        {/* Floating Icons */}
        {floatingElements.map((item, index) => (
          <motion.div
            key={index}
            className="absolute hidden lg:block"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.2, 
              scale: 1,
              x: [0, item.x * 0.5, item.x, item.x * 0.5, 0],
              y: [0, item.y * 0.5, item.y, item.y * 0.5, 0]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              delay: item.delay,
              ease: "easeInOut"
            }}
            style={{
              left: `${10 + index * 20}%`,
              top: `${10 + index * 20}%`
            }}
          >
            <item.icon size={32} className="text-white" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium font-outfit">
              <img src="/logo-dark.svg" alt="PrepSphere AI" className="w-4 h-4" />
              Join Thousands of Successful Learners
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-outfit"
          >
            Ready to Ace Your{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Next Exam?
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed font-outfit"
          >
            Start creating personalized study materials in minutes. 
            Join thousands of students already succeeding with PrepSphere AI.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
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
                    className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 px-12 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-outfit"
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
                      className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 px-12 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-outfit"
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
                      className="w-full sm:w-auto bg-transparent border-2 border-white/50 text-white hover:bg-white/10 hover:border-white px-12 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 font-outfit"
                    >
                      Book Demo
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { number: "10,000+", label: "Active Students", icon: "👥" },
              { number: "50,000+", label: "Study Materials Created", icon: "📚" },
              { number: "95%", label: "Success Rate", icon: "🎯" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-white/80 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-white dark:fill-gray-900">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  )
}

export default CTASection