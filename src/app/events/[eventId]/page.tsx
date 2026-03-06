import { getServerThemeCookie } from 'src/lib/server-cookies'
import { EventPageClient } from './EventPageClient'

interface PageProps {
  params: { eventId: string }
}

const Page = ({ params }: PageProps) => {
  const serverThemeMode = getServerThemeCookie()

  return (
    <EventPageClient
      eventId={params.eventId}
      serverThemeMode={serverThemeMode}
    />
  )
}

export default Page
