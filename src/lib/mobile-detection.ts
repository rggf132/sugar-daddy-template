export function isMobileDevice(userAgent: string): boolean {
  if (!userAgent) return false

  // Check for desktop browsers (keep sidebar expanded)
  const desktopRegex = /Windows NT|Macintosh|Linux|Ubuntu|Fedora|Debian/i
  if (desktopRegex.test(userAgent)) {
    return false // Desktop browsers should have expanded sidebar
  }

  // Everything else (mobile, tablet, etc.) gets collapsed sidebar
  return true
}

export function getInitialSidebarState(userAgent: string): boolean {
  // Default to collapsed on everything except desktop web browsers
  return isMobileDevice(userAgent)
}

// Client-side fallback for cases where user agent is not available
export function isMobileClient(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768 // md breakpoint
}
