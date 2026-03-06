import { useQuery } from '@tanstack/react-query'
import { countriesKeys } from '../countriesKeys'
import { RequestTypes } from '../requestTypes'

export const useGetAllCountries = (
  params?: RequestTypes['getAllCountries'],
  options?: { enabled?: boolean; placeholderData?: unknown },
) => {
  return useQuery({
    ...countriesKeys.allCountries(params || {}),
    staleTime: 1000 * 60 * 30,
    ...options,
  })
}
