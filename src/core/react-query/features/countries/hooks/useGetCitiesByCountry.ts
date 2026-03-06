import { useQuery } from '@tanstack/react-query'
import { countriesKeys } from '../countriesKeys'
import { RequestTypes } from '../requestTypes'

export const useGetCitiesByCountry = (
  params: RequestTypes['getCitiesByCountry'],
  options?: { enabled?: boolean; placeholderData?: unknown },
) => {
  return useQuery({
    ...countriesKeys.citiesByCountry(params),
    staleTime: 1000 * 60 * 30,
    ...options,
  })
}
