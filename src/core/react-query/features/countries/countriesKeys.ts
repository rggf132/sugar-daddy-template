import { createQueryKeys } from '@lukemorales/query-key-factory'
import { RequestTypes } from './requestTypes'
import { APIAxiosInstance } from 'src/core/axios/api-axios-instance'

export const countriesKeys = createQueryKeys('countries', {
  allCountries: ({ search }: RequestTypes['getAllCountries']) => ({
    queryKey: ['all', search],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (search) {
        params.append('search', search)
      }
      const { data } = await APIAxiosInstance.get(
        `/countries?${params.toString()}`,
      )
      return data
    },
  }),
  citiesByCountry: ({
    country,
    search,
    cityId,
  }: RequestTypes['getCitiesByCountry']) => ({
    queryKey: [country, search, cityId],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (search) {
        params.append('search', search)
      }
      if (cityId) {
        params.append('cityId', cityId)
      }
      const { data } = await APIAxiosInstance.get(
        `/countries/${encodeURIComponent(country)}/cities?${params.toString()}`,
      )
      return data
    },
  }),
})
