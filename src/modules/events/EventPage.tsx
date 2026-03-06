'use client'

import { Card, CardContent, Container, Grid, useTheme } from '@mui/material'
import { useGetEvent } from 'src/core/react-query/features/events/hooks/useGetEvent'
import { useSession } from 'next-auth/react'
import { EventHeader } from './EventHeader'
import { EventImage } from './EventImage'
import { EventDetails } from './EventDetails'
import { CreatorSidebar } from './CreatorSidebar'

type EventPageProps = {
  eventId: string
  isAdmin?: boolean
}

export const EventPage: React.FC<EventPageProps> = ({ eventId, isAdmin }) => {
  const theme = useTheme()
  const { data: session } = useSession()
  console.log('session', session)
  console.log('isAdmin', isAdmin)

  const { data: event, isLoading } = useGetEvent({ eventId })

  if (isLoading || !event) {
    return null
  }

  const canEdit = event.creator_id == session?.user?.id || !!isAdmin

  const creator = {
    name: event.creator_name,
    image: event.creator_image,
    email: event.creator_email,
  }

  return (
    <Container
      maxWidth='xl'
      sx={{
        pt: 3,
        pb: 4,
        minHeight: 'calc(100vh - 100px)',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow:
                theme.palette.mode === 'light'
                  ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
              border:
                theme.palette.mode === 'light'
                  ? '1px solid rgba(0, 0, 0, 0.05)'
                  : '1px solid rgba(255, 255, 255, 0.05)',
              overflow: 'hidden',
            }}
          >
            <EventHeader event={event} canEdit={canEdit} />
            <CardContent sx={{ p: 0 }}>
              <EventImage imageUrl={event.imageUrl} title={event.title} />
              <EventDetails event={event} />
            </CardContent>
          </Card>
        </Grid>
        <CreatorSidebar creator={creator} />
      </Grid>
    </Container>
  )
}
