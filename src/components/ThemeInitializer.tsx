'use client'

import { useEffect } from 'react'
import { getThemeCookie } from 'src/lib/cookies'

export const ThemeInitializer: React.FC = () => {
  useEffect(() => {
    // This runs only on the client side after hydration
    const initializeTheme = () => {
      try {
        // Use the same cookie system as ThemeProvider
        const theme = getThemeCookie()
        if (theme === 'dark') {
          document.documentElement.style.colorScheme = 'dark'
          document.documentElement.classList.add('dark-theme')
        } else if (theme === 'light') {
          document.documentElement.style.colorScheme = 'light'
          document.documentElement.classList.add('light-theme')
        } else {
          // Check system preference if no cookie
          const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
          ).matches
          if (prefersDark) {
            document.documentElement.style.colorScheme = 'dark'
            document.documentElement.classList.add('dark-theme')
          } else {
            document.documentElement.style.colorScheme = 'light'
            document.documentElement.classList.add('light-theme')
          }
        }
      } catch (e) {
        // Fallback to light theme if there's an error
        document.documentElement.style.colorScheme = 'light'
        document.documentElement.classList.add('light-theme')
      }
    }

    // Add CSS for skeleton colors
    const style = document.createElement('style')
    style.textContent = `
      .dark-theme .MuiSkeleton-root {
        background-color: rgba(255, 255, 255, 0.08) !important;
      }
      .light-theme .MuiSkeleton-root {
        background-color: rgba(0, 0, 0, 0.08) !important;
      }
    `
    document.head.appendChild(style)

    initializeTheme()
  }, [])

  return null
}
