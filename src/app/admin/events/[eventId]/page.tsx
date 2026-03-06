'use client'

import { useParams } from 'next/navigation'
import { EventPage } from 'src/modules/events/EventPage'
import { useSession } from 'next-auth/react'

const Page = () => {
  const { data: session } = useSession()

  const isAdmin = session?.user?.isAdmin ?? false

  const params = useParams<{ eventId: string }>()

  return <EventPage eventId={params?.eventId} isAdmin={isAdmin} />
}

export default Page
