'use client'

import React from 'react'
import { useGetAllEventsInfinite } from 'src/core/react-query/features/events/hooks/useGetAllEvents'
import { RequestTypes } from 'src/core/react-query/features/events/requestTypes'
import { Event } from 'src/core/react-query/features/events/types'
import { EventsList } from './EventsList'
import { useInfiniteScroll } from 'src/core/hooks/useInfiniteScroll'

interface InfiniteEventsListProps {
  filters: Omit<RequestTypes['getAllEvents'], 'page' | 'limit'>
  onEventClick?: (event: Event) => void
  autoLoadMore?: boolean // Enable automatic infinite scrolling
  showLoadMoreButton?: boolean // Show manual load more button
}

export const InfiniteEventsList: React.FC<InfiniteEventsListProps> = ({
  filters,
  onEventClick,
  autoLoadMore = false,
  showLoadMoreButton = false,
}) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useGetAllEventsInfinite(filters, {
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Flatten all pages into a single array
  const allEvents: Event[] =
    (data as { pages?: { events: Event[] }[] })?.pages?.flatMap(
      (page) => page.events,
    ) || []

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  // Set up infinite scroll if enabled
  const loadMoreRef = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    hasMore: !!hasNextPage,
    isLoading: isFetchingNextPage,
    threshold: 200, // Start loading 200px before reaching the bottom
  })

  return (
    <>
      <EventsList
        events={allEvents}
        onEventClick={onEventClick}
        isLoading={isLoading}
        isError={isError}
        error={typeof error === 'string' ? error : null}
        hasMore={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={handleLoadMore}
        showLoadMoreButton={showLoadMoreButton}
      />

      {/* Infinite scroll trigger element */}
      {autoLoadMore && hasNextPage && (
        <div ref={loadMoreRef} style={{ height: '1px' }} />
      )}
    </>
  )
}
