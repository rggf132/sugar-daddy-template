'use client'

import { EventsHomePage } from 'src/modules/events/EventsHomePage'
import { useSession } from 'next-auth/react'

const Page = () => {
  const { data: session } = useSession()

  const isAdmin = session?.user?.isAdmin ?? false
  return <EventsHomePage isAdmin={isAdmin} />
}

export default Page
