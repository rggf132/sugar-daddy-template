'use client'

import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { CalendarToday, LocationOn } from '@mui/icons-material'
import { Flex } from 'src/components/Flex'
import { EventCategoryChips } from './EventCategoryChips'
import { EventOtherChips } from './EventOtherChips'
import { sanitizeAndParse } from 'src/lib/sanitize'
import { Event } from 'src/core/react-query/features/events/types'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

interface EventDetailsProps {
  event: Event
}

export const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  const theme = useTheme()

  const createdAt = dayjs(event.created_at).format('D MMM YYYY, hh:mm')
  const updatedAt = dayjs(event.modified_at).format('D MMM YYYY, hh:mm')

  const startDate = dayjs.utc(event.start).local().format('D MMM YYYY, HH:mm')
  const endDate = dayjs.utc(event.end).local().format('D MMM YYYY, HH:mm')

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <Card
          sx={{
            flex: 1,
            borderRadius: 2,
            backgroundColor:
              theme.palette.mode === 'light'
                ? 'rgba(99, 102, 241, 0.05)'
                : 'rgba(99, 102, 241, 0.1)',
            border: `1px solid ${
              theme.palette.mode === 'light'
                ? 'rgba(99, 102, 241, 0.1)'
                : 'rgba(99, 102, 241, 0.2)'
            }`,
          }}
        >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Flex alignItems='center' gap={1} sx={{ mb: 1 }}>
              <CalendarToday sx={{ fontSize: 18, color: 'primary.main' }} />
              <Typography
                variant='subtitle2'
                color='primary.main'
                fontWeight={600}
              >
                Date & Time
              </Typography>
            </Flex>
            <Typography variant='body2' color='text.secondary'>
              {startDate} - {endDate}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            borderRadius: 2,
            backgroundColor:
              theme.palette.mode === 'light'
                ? 'rgba(236, 72, 153, 0.05)'
                : 'rgba(236, 72, 153, 0.1)',
            border: `1px solid ${
              theme.palette.mode === 'light'
                ? 'rgba(236, 72, 153, 0.1)'
                : 'rgba(236, 72, 153, 0.2)'
            }`,
          }}
        >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Flex alignItems='center' gap={1} sx={{ mb: 1 }}>
              <LocationOn sx={{ fontSize: 18, color: 'secondary.main' }} />
              <Typography
                variant='subtitle2'
                color='secondary.main'
                fontWeight={600}
              >
                Location
              </Typography>
            </Flex>
            <Typography variant='body2' color='text.secondary'>
              {event.country_name}, {event.city_name}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant='h6'
          sx={{
            mb: 2,
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          About this event
        </Typography>
        <Typography
          variant='body1'
          sx={{
            lineHeight: 1.7,
            color: 'text.secondary',
          }}
        >
          {sanitizeAndParse(event.description)}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <EventOtherChips event={event} />
        <Box sx={{ mt: 2 }}>
          <EventCategoryChips event={event} />
        </Box>
      </Box>

      <Box
        sx={{
          pt: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <Typography variant='caption' color='text.disabled'>
            Created: {createdAt}
          </Typography>
          <Typography variant='caption' color='text.disabled'>
            Modified: {updatedAt}
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}
