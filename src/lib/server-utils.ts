import { cookies } from 'next/headers'

export function getServerThemeMode(): 'light' | 'dark' {
  try {
    const cookieStore = cookies()
    const themeCookie = cookieStore.get('theme-mode')

    if (themeCookie?.value === 'dark') {
      return 'dark'
    }
    if (themeCookie?.value === 'light') {
      return 'light'
    }

    // Default to light theme if no cookie found
    return 'light'
  } catch (error) {
    // Fallback to light theme if there's an error
    return 'light'
  }
}
