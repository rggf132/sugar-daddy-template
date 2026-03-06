'use client'

import { EventsHomePageSkeleton } from './EventsHomePageSkeleton'
import { ClientEventsHomePage } from './ClientEventsHomePage'
import { useEffect, useState } from 'react'

interface EventsHomePageProps {
  isAdmin?: boolean
  serverThemeMode?: 'light' | 'dark'
}

export const EventsHomePage: React.FC<EventsHomePageProps> = ({
  isAdmin,
  serverThemeMode = 'light',
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show skeleton during SSR and initial client render
  if (!mounted) {
    console.log('serverThemeMode', serverThemeMode)
    return <EventsHomePageSkeleton serverThemeMode={serverThemeMode} />
  }

  return <ClientEventsHomePage isAdmin={isAdmin} />
}
