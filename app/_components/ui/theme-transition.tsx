'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'

interface ThemeTransitionProps {
  children: React.ReactNode
}

export const ThemeTransition: React.FC<ThemeTransitionProps> = ({ children }) => {
  const { theme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setIsTransitioning(true)
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 800) // Duration of the transition

      return () => clearTimeout(timer)
    }
  }, [theme, mounted])

  if (!mounted) {
    return <div className="opacity-0">{children}</div>
  }

  return (
    <div className="relative">
      {children}
      
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <motion.div
              className={`absolute rounded-full ${
                theme === 'dark' 
                  ? 'bg-slate-900' 
                  : 'bg-white'
              }`}
              initial={{
                width: 0,
                height: 0,
                top: '1rem',
                right: '1rem',
                x: '50%',
                y: '50%'
              }}
              animate={{
                width: '300vmax',
                height: '300vmax',
                top: '1rem',
                right: '1rem',
                x: '50%',
                y: '50%'
              }}
              exit={{
                width: 0,
                height: 0,
                transition: { duration: 0.3 }
              }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1]
              }}
              style={{
                transformOrigin: 'center center'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeTransition