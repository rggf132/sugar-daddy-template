import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { eventsKeys } from '../eventsKeys'
import { RequestTypes } from '../requestTypes'
import { PaginatedEventsResponse } from '../types'

export const useGetAllEvents = (
  payload: RequestTypes['getAllEvents'],
  options?: { enabled?: boolean },
) => {
  return useQuery({
    ...eventsKeys.allEvents(payload),
    ...options,
  })
}

export const useGetAllEventsInfinite = (
  payload: Omit<RequestTypes['getAllEvents'], 'page'>,
  options?: { staleTime?: number },
) => {
  const queryOptions = eventsKeys.infiniteEvents(payload)
  return useInfiniteQuery({
    queryKey: queryOptions.queryKey,
    queryFn: queryOptions.queryFn as (ctx: {
      pageParam: number
    }) => Promise<PaginatedEventsResponse>,
    getNextPageParam: (lastPage: PaginatedEventsResponse) => {
      return lastPage.pagination.hasMore
        ? lastPage.pagination.page + 1
        : undefined
    },
    initialPageParam: 1,
    ...options,
  })
}
