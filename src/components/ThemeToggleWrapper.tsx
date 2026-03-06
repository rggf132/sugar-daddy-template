import React from 'react'
import { ThemeToggle } from './ThemeToggle'
import { ClientThemeToggle } from './ClientThemeToggle'

export const ThemeToggleWrapper: React.FC = () => {
  // Server-side rendering
  if (typeof window === 'undefined') {
    return <ThemeToggle />
  }

  // Client-side rendering
  return <ClientThemeToggle />
}
