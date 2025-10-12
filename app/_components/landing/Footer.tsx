'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Twitter, Github, Linkedin } from 'lucide-react'
import { useTheme } from 'next-themes'

const Footer = () => {
  const { theme } = useTheme()
  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Roadmap', href: '#' }
    ]
  }

  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@prepsphere.ai', label: 'Email' }
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-12 sm:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <Link href="/" className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10">
                <img
                  src={theme === 'dark' ? '/logo-dark.svg' : '/logo-dark.svg'}
                  alt="PrepSphere AI"
                  className="w-full h-full"
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold font-outfit">PrepSphere AI</span>
            </Link>

            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Transform your learning experience with AI-powered study materials,
              quizzes, and personalized learning paths designed for exam success.
            </p>

            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 dark:bg-slate-800 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 dark:hover:from-orange-500 dark:hover:to-amber-500 rounded-lg flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 font-outfit">Product</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 font-outfit text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 mt-8 sm:mt-12 pt-8 sm:pt-12"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              Get the latest updates on new features, study tips, and educational insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800 dark:bg-slate-800 border border-gray-700 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-500 text-white placeholder-gray-400 text-sm sm:text-base"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-500 dark:to-amber-500 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-600 dark:hover:to-amber-600 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-gray-800 dark:border-slate-700 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center"
        >
          <p className="text-gray-400 text-sm font-outfit">
            © {currentYear} PrepSphere AI. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer