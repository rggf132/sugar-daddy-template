import { useQuery } from '@tanstack/react-query'
import { eventsKeys } from '../eventsKeys'
import { RequestTypes } from '../requestTypes'

export const useGetEvent = (
  payload: RequestTypes['getEvent'],
  options?: { enabled?: boolean },
) => {
  return useQuery({
    ...eventsKeys.byId(payload),
    ...options,
  })
}
