'use client'

import { useEffect, useState } from 'react'
import { EventPage } from 'src/modules/events/EventPage'
import { SSREventsPageSkeleton } from 'src/components/SSREventsPageSkeleton'

interface EventPageClientProps {
  eventId: string
  serverThemeMode: 'light' | 'dark'
}

export const EventPageClient: React.FC<EventPageClientProps> = ({
  eventId,
  serverThemeMode,
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show skeleton during SSR and initial client render to prevent hydration mismatch
  if (!mounted) {
    return (
      <SSREventsPageSkeleton themeMode={serverThemeMode} isMobile={false} />
    )
  }

  return <EventPage eventId={eventId} />
}
