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
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10">
                <img
                  src={theme === 'dark' ? '/logo-dark.svg' : '/logo-dark.svg'}
                  alt="PrepSphere AI"
                  className="w-full h-full"
                />
              </div>
              <span className="text-2xl font-bold font-outfit">PrepSphere AI</span>
            </Link>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Transform your learning experience with AI-powered study materials,
              quizzes, and personalized learning paths designed for exam success.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-800 dark:bg-slate-800 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 dark:hover:from-orange-500 dark:hover:to-amber-500 rounded-lg flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 font-outfit">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 font-outfit"
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
          className="border-t border-gray-800 mt-12 pt-12"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">
              Get the latest updates on new features, study tips, and educational insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 dark:bg-slate-800 border border-gray-700 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-500 text-white placeholder-gray-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-500 dark:to-amber-500 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-600 dark:hover:to-amber-600 rounded-lg font-medium transition-all duration-300"
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
          className="border-t border-gray-800 dark:border-slate-700 mt-12 pt-8 text-center"
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