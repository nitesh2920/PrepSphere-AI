'use client'

import { ReactNode, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  
  // Framer Motion integration
  const scrollY = useMotionValue(0)
  const smoothScrollY = useSpring(scrollY, { 
    damping: 50, 
    stiffness: 400 
  })

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Connect Lenis scroll to Framer Motion
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      scrollY.set(scroll)
    })

    // Animation loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, [scrollY])

  // Handle anchor link clicks
  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      const href = target.getAttribute('href')
      
      if (href?.startsWith('#')) {
        e.preventDefault()
        const element = document.querySelector(href)
        if (element && lenisRef.current) {
          lenisRef.current.scrollTo(element, {
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return <>{children}</>
}