'use client'

import React, { useRef, useState, useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useThemeTransition } from '@/app/_hooks/useThemeTransition'

const CustomUserButton = () => {
  const { theme } = useTheme()
  const { toggleTheme, isTransitioning } = useThemeTransition()
  const themeButtonRef = useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before showing theme-dependent content
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = () => {
    if (!isTransitioning) {
      toggleTheme(themeButtonRef)
    }
  }

  // Don't render theme-dependent content until mounted
  if (!mounted) {
    return (
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Action
            label="Toggle Theme"
            labelIcon={<Moon size={16} />}
            onClick={handleThemeToggle}
          />
        </UserButton.MenuItems>
      </UserButton>
    )
  }

  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          labelIcon={theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          onClick={handleThemeToggle}
        />
      </UserButton.MenuItems>
    </UserButton>
  )
}

export default CustomUserButton