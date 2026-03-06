'use client'

import React, { createContext, useContext, useState } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { createAppTheme } from 'src/theme'
import { getThemeCookie, setThemeCookie } from 'src/lib/cookies'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  mode: ThemeMode
  toggleTheme: () => void
  setTheme: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  initialTheme?: 'light' | 'dark'
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme,
}) => {
  // Initialize theme from server-side initialTheme first, then cookies, then system preference
  const getInitialTheme = (): ThemeMode => {
    // Prioritize server-side theme (from cookies)
    if (initialTheme) {
      return initialTheme
    }

    if (typeof window !== 'undefined') {
      // Try to get from cookie first
      const cookieTheme = getThemeCookie()
      if (cookieTheme) {
        return cookieTheme
      }

      // Check system preference if no cookie
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
      const systemTheme = prefersDark ? 'dark' : 'light'

      // Set cookie for future use
      setThemeCookie(systemTheme)
      return systemTheme
    }
    return 'light'
  }

  const [mode, setMode] = useState<ThemeMode>(getInitialTheme)

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    setThemeCookie(newMode)

    // Update CSS classes
    document.documentElement.style.colorScheme = newMode
    document.documentElement.classList.remove('light-theme', 'dark-theme')
    document.documentElement.classList.add(`${newMode}-theme`)
  }

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode)
    setThemeCookie(newMode)

    // Update CSS classes
    document.documentElement.style.colorScheme = newMode
    document.documentElement.classList.remove('light-theme', 'dark-theme')
    document.documentElement.classList.add(`${newMode}-theme`)
  }

  // Use server theme for initial render to prevent hydration mismatch, then client theme after mount
  const theme = createAppTheme(mode)

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
