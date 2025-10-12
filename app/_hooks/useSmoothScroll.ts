import { useCallback, useState } from 'react'

export const useSmoothScroll = () => {
  const [isScrolling, setIsScrolling] = useState(false)

  const scrollToElement = useCallback((elementId: string, offset: number = 80) => {
    const element = document.querySelector(elementId) || document.getElementById(elementId.replace('#', ''))
    
    if (element) {
      setIsScrolling(true)
      
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset
      const startPosition = window.pageYOffset
      const distance = offsetPosition - startPosition
      const duration = 800 // Animation duration in ms
      let start: number | null = null

      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = timestamp - start
        const percentage = Math.min(progress / duration, 1)
        
        // Easing function for smooth animation (ease-in-out-cubic)
        const easeInOutCubic = (t: number) => 
          t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
        
        const easedPercentage = easeInOutCubic(percentage)
        window.scrollTo(0, startPosition + distance * easedPercentage)
        
        if (progress < duration) {
          window.requestAnimationFrame(step)
        } else {
          setIsScrolling(false)
        }
      }
      
      window.requestAnimationFrame(step)
    }
  }, [])

  return { scrollToElement, isScrolling }
}