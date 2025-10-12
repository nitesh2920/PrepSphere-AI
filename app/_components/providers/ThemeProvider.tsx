'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props} suppressHydrationWarning>
      <div className="transition-colors duration-300 ease-in-out">
        {children}
      </div>
    </NextThemesProvider>
  )
}