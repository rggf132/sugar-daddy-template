// Comprehensive skeleton colors object based on the actual theme colors
export function getSkeletonColors(theme: 'light' | 'dark') {
  if (theme === 'dark') {
    return {
      // Background colors - using exact dark theme colors
      background: {
        default: '#0F172A', // slate-900 - main background
        paper: '#1E293B', // slate-800 - card background
        card: '#1E293B', // slate-800 - card background
        sidebar: '#1E293B', // slate-800 - sidebar background
        searchBar: '#1E293B', // slate-800 - search bar background
      },
      // Skeleton element colors - subtle white on dark backgrounds
      skeleton: {
        primary: 'rgba(255, 255, 255, 0.12)', // Subtle white for main skeleton elements
        secondary: 'rgba(255, 255, 255, 0.08)', // More subtle for secondary elements
        tertiary: 'rgba(255, 255, 255, 0.05)', // Very subtle for tertiary elements
        text: 'rgba(255, 255, 255, 0.15)', // For text skeletons
        image: 'rgba(255, 255, 255, 0.06)', // For image placeholders
      },
      // Border colors - using exact dark theme borders
      border: {
        card: 'rgba(255, 255, 255, 0.05)', // Card borders
        divider: 'rgba(255, 255, 255, 0.08)', // Dividers
      },
    }
  } else {
    return {
      // Background colors - using exact light theme colors
      background: {
        default: '#F8FAFC', // slate-50 - main background
        paper: '#FFFFFF', // white - card background
        card: '#FFFFFF', // white - card background
        sidebar: '#FFFFFF', // white - sidebar background
        searchBar: '#FFFFFF', // white - search bar background
      },
      // Skeleton element colors - dark gray on light backgrounds
      skeleton: {
        primary: 'rgba(0, 0, 0, 0.12)', // Dark gray for main skeleton elements
        secondary: 'rgba(0, 0, 0, 0.08)', // More subtle for secondary elements
        tertiary: 'rgba(0, 0, 0, 0.05)', // Very subtle for tertiary elements
        text: 'rgba(0, 0, 0, 0.15)', // For text skeletons
        image: 'rgba(0, 0, 0, 0.06)', // For image placeholders
      },
      // Border colors - using exact light theme borders
      border: {
        card: 'rgba(0, 0, 0, 0.05)', // Card borders
        divider: 'rgba(0, 0, 0, 0.08)', // Dividers
      },
    }
  }
}

// Legacy functions for backward compatibility
export function getSkeletonColor(theme: 'light' | 'dark'): string {
  const colors = getSkeletonColors(theme)
  return colors.skeleton.primary
}

export function getSkeletonBackgroundColor(theme: 'light' | 'dark'): string {
  const colors = getSkeletonColors(theme)
  return colors.background.paper
}

export function getCardBackgroundColor(theme: 'light' | 'dark'): string {
  const colors = getSkeletonColors(theme)
  return colors.background.card
}
