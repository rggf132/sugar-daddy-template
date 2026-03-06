'use client'

import { useEffect, useState } from 'react'
import { ProfilePageClient } from './ProfilePageClient'
import { SSRProfilePageSkeleton } from 'src/components/SSRProfilePageSkeleton'

interface ProfilePageWrapperProps {
  serverThemeMode: 'light' | 'dark'
}

export const ProfilePageWrapper: React.FC<ProfilePageWrapperProps> = ({
  serverThemeMode,
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show skeleton during SSR and initial client render to prevent hydration mismatch
  if (!mounted) {
    return (
      <SSRProfilePageSkeleton themeMode={serverThemeMode} isMobile={false} />
    )
  }

  return <ProfilePageClient serverThemeMode={serverThemeMode} />
}
