// Client-side cookie utilities
export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

export const setCookie = (
  name: string,
  value: string,
  options: {
    maxAge?: number
    path?: string
    secure?: boolean
    sameSite?: 'strict' | 'lax' | 'none'
  } = {},
): void => {
  if (typeof document === 'undefined') return

  const {
    maxAge = 31536000, // 1 year default
    path = '/',
    secure = process.env.NODE_ENV === 'production',
    sameSite = 'lax',
  } = options

  let cookieString = `${name}=${value}; path=${path}; max-age=${maxAge}; samesite=${sameSite}`

  if (secure) {
    cookieString += '; secure'
  }

  document.cookie = cookieString
}

export const deleteCookie = (name: string, path: string = '/'): void => {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
}

// Theme-specific utilities
export const getThemeCookie = (): 'light' | 'dark' => {
  const theme = getCookie('theme-mode')
  return theme === 'dark' || theme === 'light' ? theme : 'light'
}

export const setThemeCookie = (theme: 'light' | 'dark'): void => {
  setCookie('theme-mode', theme, {
    maxAge: 31536000, // 1 year
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })
}

// Sidebar-specific utilities
export const getSidebarCookie = (): boolean => {
  const sidebar = getCookie('sidebar-collapsed')
  return sidebar === 'true'
}

export const setSidebarCookie = (collapsed: boolean): void => {
  setCookie('sidebar-collapsed', collapsed.toString(), {
    maxAge: 31536000, // 1 year
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })
}
