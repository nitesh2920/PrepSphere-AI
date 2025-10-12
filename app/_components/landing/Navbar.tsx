'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { useThemeTransition } from '@/app/_hooks/useThemeTransition'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isSignedIn } = useUser()
  const { theme } = useTheme()
  const { toggleTheme, isTransitioning } = useThemeTransition()
  const [mounted, setMounted] = useState(false)
  const themeButtonRef = useRef<HTMLButtonElement>(null)
  const mobileThemeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' }
  ]

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleMenu = () => setIsOpen(!isOpen)

  if (!mounted) return null

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10"
            >
              <img 
                src={theme === 'dark' ? '/logo-dark.svg' : '/logo-dark.svg'} 
                alt="PrepSphere AI" 
                className="w-full h-full" 
              />
            </motion.div>
            <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white font-outfit">
              PrepSphere AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.button
                key={index}
                onClick={() => handleNavClick(link.href)}
                whileHover={{ y: -2 }}
                className="text-gray-700  cursor-pointer dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors duration-200"
              >
                {link.name}
              </motion.button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              ref={themeButtonRef}
              whileHover={{ scale: isTransitioning ? 1 : 1.1 }}
              whileTap={{ scale: isTransitioning ? 1 : 0.9 }}
              onClick={() => toggleTheme(themeButtonRef)}
              disabled={isTransitioning}
              className="p-2 rounded-lg cursor-pointer bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:cursor-not-allowed"
            >
              <motion.div
                animate={{ rotate: isTransitioning ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? (
                  <Sun size={20} className="text-yellow-500" />
                ) : (
                  <Moon size={20} className="text-gray-600" />
                )}
              </motion.div>
            </motion.button>

            {/* Auth Buttons */}
            {isSignedIn ? (
              <Link href="/dashboard">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-500 dark:to-amber-500 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-600 dark:hover:to-amber-600 text-white">
                    Dashboard
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/sign-in">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400">
                      Sign In
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/sign-up">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-500 dark:to-amber-500 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-600 dark:hover:to-amber-600 text-white">
                      Get Started
                    </Button>
                  </motion.div>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            <motion.button
              ref={mobileThemeButtonRef}
              whileHover={{ scale: isTransitioning ? 1 : 1.1 }}
              whileTap={{ scale: isTransitioning ? 1 : 0.9 }}
              onClick={() => toggleTheme(mobileThemeButtonRef)}
              disabled={isTransitioning}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:cursor-not-allowed"
            >
              <motion.div
                animate={{ rotate: isTransitioning ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? (
                  <Sun size={18} className="text-yellow-500" />
                ) : (
                  <Moon size={18} className="text-gray-600" />
                )}
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isOpen ? (
                <X size={20} className="text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu size={20} className="text-gray-600 dark:text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="py-4 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      handleNavClick(link.href)
                      setIsOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors"
                  >
                    {link.name}
                  </motion.button>
                ))}
                
                <div className="px-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {isSignedIn ? (
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-500 dark:to-amber-500 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-600 dark:hover:to-amber-600 text-white">
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <div className="space-y-3">
                      <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-500 dark:to-amber-500 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-600 dark:hover:to-amber-600 text-white">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar