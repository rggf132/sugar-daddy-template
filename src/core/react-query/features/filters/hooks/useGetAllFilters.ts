import { useQuery } from '@tanstack/react-query'
import { filtersKeys } from '../filtersKeys'
import { RequestTypes } from '../requestTypes'

export const useGetAllFilters = (
  payload?: RequestTypes['getAllFilters'],
  options?: { enabled?: boolean },
) => {
  return useQuery({
    ...filtersKeys.allFilters(payload),
    staleTime: 1000 * 60 * 30,
    refetchOnMount: false,
    ...options,
  })
}
