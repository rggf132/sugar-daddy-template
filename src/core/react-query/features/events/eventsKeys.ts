import {
  createMutationKeys,
  createQueryKeys,
} from '@lukemorales/query-key-factory'
import { RequestTypes } from './requestTypes'
import { APIAxiosInstance } from 'src/core/axios/api-axios-instance'
import { createQueryKeyString } from '../../queryParams'
import { PaginatedEventsResponse } from './types'

export const eventsKeys = createQueryKeys('events', {
  allEvents: (payload: RequestTypes['getAllEvents']) => {
    return {
      queryKey: [payload],
      queryFn: async (): Promise<PaginatedEventsResponse> => {
        const searchParams = createQueryKeyString(payload)
        const { data } = await APIAxiosInstance.get(`/events${searchParams}`)

        return data
      },
    }
  },
  infiniteEvents: (payload: RequestTypes['getAllEvents']) => {
    return {
      queryKey: [payload],
      queryFn: async ({ pageParam = 1 }): Promise<PaginatedEventsResponse> => {
        const searchParams = createQueryKeyString({
          ...payload,
          page: pageParam,
          limit: '20',
        })
        const { data } = await APIAxiosInstance.get(`/events${searchParams}`)
        return data
      },
    }
  },
  byId: ({ eventId }: RequestTypes['getEvent']) => {
    return {
      queryKey: [eventId],
      queryFn: async () => {
        const { data } = await APIAxiosInstance.get(`/events/${eventId}`)
        return data
      },
    }
  },
})

export async function createEventApi(payload: RequestTypes['createEvent']) {
  const { data } = await APIAxiosInstance.post(`/events/`, payload)
  return data
}

export async function updateEventApi(payload: RequestTypes['updateEvent']) {
  const { data } = await APIAxiosInstance.put(
    `/events/${payload.eventId}`,
    payload,
  )
  return data
}

export async function deleteEventApi(payload: RequestTypes['deleteEvent']) {
  const { data } = await APIAxiosInstance.delete(`/events/${payload.eventId}`)
  return data
}

export const eventsMutationKeys = createMutationKeys('events', {
  createEvent: {
    mutationKey: null,
    mutationFn: createEventApi,
  },
  updateEvent: {
    mutationKey: null,
    mutationFn: updateEventApi,
  },
  deleteEvent: {
    mutationKey: null,
    mutationFn: deleteEventApi,
  },
})
