'use client'

import { motion } from 'framer-motion'

interface AuthBackgroundProps {
  children: React.ReactNode
}

export default function AuthBackground({ children }: AuthBackgroundProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Blurred Background */}
      <div className="absolute inset-0 z-0">
        {/* Background gradient matching the landing page */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-orange-950/20" />
        
        {/* Animated background elements */}
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400/20 dark:bg-orange-400/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-400/20 dark:bg-amber-400/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Additional floating elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-300/10 dark:bg-orange-300/5 rounded-full blur-2xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-amber-300/10 dark:bg-amber-300/5 rounded-full blur-2xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Main blur overlay */}
        <div className="absolute inset-0 auth-blur-bg bg-white/20 dark:bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}