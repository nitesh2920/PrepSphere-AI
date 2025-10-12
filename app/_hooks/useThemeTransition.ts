'use client'

import { useState, useCallback } from 'react'
import { useTheme } from 'next-themes'

export const useThemeTransition = () => {
  const { theme, setTheme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const toggleTheme = useCallback((buttonRef?: React.RefObject<HTMLElement | null>) => {
    if (isTransitioning) return

    setIsTransitioning(true)

    // Get button position for animation origin
    let originX = '95%' // Default to top-right
    let originY = '5%'

    if (buttonRef?.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      originX = `${rect.left + rect.width / 2}px`
      originY = `${rect.top + rect.height / 2}px`
    }

    // Create the transition overlay
    const overlay = document.createElement('div')
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    `

    const circle = document.createElement('div')
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    
    circle.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background-color: ${newTheme === 'dark' ? '#0f172a' : '#ffffff'};
      width: 0;
      height: 0;
      left: ${originX};
      top: ${originY};
      transform: translate(-50%, -50%);
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    `

    overlay.appendChild(circle)
    document.body.appendChild(overlay)

    // Trigger the animation
    requestAnimationFrame(() => {
      const maxDimension = Math.max(window.innerWidth, window.innerHeight)
      const diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)
      const size = diagonal * 2

      circle.style.width = `${size}px`
      circle.style.height = `${size}px`
    })

    // Change theme after a short delay
    setTimeout(() => {
      setTheme(newTheme)
    }, 400)

    // Clean up
    setTimeout(() => {
      document.body.removeChild(overlay)
      setIsTransitioning(false)
    }, 800)
  }, [theme, setTheme, isTransitioning])

  return {
    toggleTheme,
    isTransitioning,
    currentTheme: theme
  }
}