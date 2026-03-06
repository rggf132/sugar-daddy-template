'use client'

import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
  Button,
} from '@mui/material'
import { Event } from 'src/core/react-query/features/events/types'
import { EventCategoryChips } from 'src/modules/events/EventCategoryChips'
import { EventOtherChips } from 'src/modules/events/EventOtherChips'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
import { useTheme } from '@mui/material/styles'
import { sanitizeAndParse } from 'src/lib/sanitize'
import Image from 'next/image'

interface EventsListProps {
  events: Event[]
  onEventClick?: (event: Event) => void
  isLoading?: boolean
  isError?: boolean
  error?: string | null
  hasMore?: boolean
  isFetchingNextPage?: boolean
  onLoadMore?: () => void
  showLoadMoreButton?: boolean
}

export const EventsList: React.FC<EventsListProps> = ({
  events,
  onEventClick,
  isLoading = false,
  isError = false,
  error = null,
  hasMore = false,
  isFetchingNextPage = false,
  onLoadMore,
  showLoadMoreButton = false,
}) => {
  const handleEventClick = (event: Event) => {
    if (onEventClick) {
      onEventClick(event)
    }
  }

  const handleLoadMore = () => {
    if (onLoadMore && hasMore && !isFetchingNextPage) {
      onLoadMore()
    }
  }

  const formatEventTime = (start: string, end: string) => {
    // Use a consistent timezone to prevent hydration mismatches
    const startDate = dayjs.utc(start).local()
    const endDate = dayjs.utc(end).local()

    const startFormatted = startDate.format('MMM DD HH:mm')
    const endFormatted = endDate.format('MMM DD HH:mm, YYYY')

    return `${startFormatted} - ${endFormatted}`
  }

  const theme = useTheme()

  if (isError && events.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color='error' variant='h6'>
          Error loading events
        </Typography>
        <Typography color='text.secondary' variant='body2'>
          {typeof error === 'string' ? error : 'Something went wrong'}
        </Typography>
      </Box>
    )
  }

  if (events.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant='h6' color='text.secondary'>
          No events found
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Try adjusting your filters or check back later
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 2,
          mb: 3,
        }}
      >
        {events.map((event) => (
          <Card
            key={event.id}
            sx={{
              cursor: onEventClick ? 'pointer' : 'default',
              height: 'fit-content',
              overflow: 'hidden',
              position: 'relative',
              '&:hover': onEventClick
                ? {
                    boxShadow:
                      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }
                : {},
            }}
            onClick={() => handleEventClick(event)}
          >
            {/* Image Preview */}
            {event.imageUrl ? (
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  sizes='(max-width: 600px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw'
                  style={{ objectFit: 'cover' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)',
                    pointerEvents: 'none',
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  background:
                    theme.palette.mode === 'light'
                      ? 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                      : 'linear-gradient(135deg, #374151 0%, #4b5563 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <img
                  src='/placeholder-image.png'
                  alt='placeholder'
                  style={{
                    width: '75px',
                    height: '50px',
                    opacity: theme.palette.mode === 'light' ? 0.4 : 0.6,
                  }}
                />
              </Box>
            )}

            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 2,
                }}
              >
                <Typography
                  variant='h6'
                  component='h3'
                  sx={{
                    flex: 1,
                    mr: 1,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: 'text.primary',
                  }}
                >
                  {event.title}
                </Typography>
                {/* <Chip
                  label={event.entry_type}
                  color={event.entry_type === 'Free' ? 'success' : 'primary'}
                  size='small'
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    height: 24,
                  }}
                /> */}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={event.creator_image || undefined}
                    alt={event.creator_name}
                    sx={{
                      width: 24,
                      height: 24,
                      mr: 1.5,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    {event.creator_name.charAt(0)}
                  </Avatar>
                </Box>

                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {formatEventTime(event.start, event.end)}
                </Typography>
              </Box>

              {event.description && (
                <Typography
                  variant='body2'
                  sx={{
                    mb: 2,
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    color: 'text.secondary',
                  }}
                >
                  {event.description.length > 100
                    ? sanitizeAndParse(
                        event.description.substring(0, 100) + '...',
                      )
                    : sanitizeAndParse(event.description)}
                </Typography>
              )}

              <Box
                sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.5 }}
              >
                <EventCategoryChips event={event} />
              </Box>

              <EventOtherChips event={event} />
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Load More Section */}
      {hasMore && showLoadMoreButton && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant='outlined'
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
            startIcon={
              isFetchingNextPage ? <CircularProgress size={16} /> : null
            }
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More Events'}
          </Button>
        </Box>
      )}

      {/* Auto-load indicator */}
      {hasMore && !showLoadMoreButton && isFetchingNextPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={20} />
            <Typography variant='body2' color='text.secondary'>
              Loading more events...
            </Typography>
          </Box>
        </Box>
      )}

      {/* End of list indicator */}
      {!hasMore && events.length > 0 && (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant='body2' color='text.secondary'>
            You've reached the end of the events list
          </Typography>
        </Box>
      )}
    </Box>
  )
}
