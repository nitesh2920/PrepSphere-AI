'use client'

import { useEffect, useRef } from 'react'
import { useInView, useAnimation, AnimationControls } from 'framer-motion'

interface UseScrollAnimationOptions {
  threshold?: number
  triggerOnce?: boolean
  delay?: number
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, triggerOnce = true, delay = 0 } = options
  
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    threshold, 
    once: triggerOnce 
  })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        controls.start('visible')
      }, delay * 1000)
      
      return () => clearTimeout(timer)
    } else {
      controls.start('hidden')
    }
  }, [isInView, controls, delay])

  return { ref, controls, isInView }
}

// Predefined animation variants
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 60,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}

export const fadeInLeft = {
  hidden: { 
    opacity: 0, 
    x: -60,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}

export const fadeInRight = {
  hidden: { 
    opacity: 0, 
    x: 60,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}