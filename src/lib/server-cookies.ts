import { cookies } from 'next/headers'

// Server-side cookie utilities
export const getServerCookie = (name: string): string | null => {
  try {
    const cookieStore = cookies()
    return cookieStore.get(name)?.value || null
  } catch (error) {
    console.warn('Failed to get server cookie:', error)
    return null
  }
}

// Theme-specific server utilities
export const getServerThemeCookie = (): 'light' | 'dark' => {
  const theme = getServerCookie('theme-mode')
  return theme === 'dark' || theme === 'light' ? theme : 'light'
}

// Sidebar-specific server utilities
export const getServerSidebarCookie = (): {
  sidebar: string | null
  sidebarState: boolean
} => {
  const sidebar = getServerCookie('sidebar-collapsed')
  return { sidebar, sidebarState: sidebar === 'true' }
}
