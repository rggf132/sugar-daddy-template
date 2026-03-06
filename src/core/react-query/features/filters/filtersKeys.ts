import { createQueryKeys } from '@lukemorales/query-key-factory'
import { RequestTypes } from './requestTypes'
import { APIAxiosInstance } from 'src/core/axios/api-axios-instance'

export const filtersKeys = createQueryKeys('filters', {
  allFilters: (_: RequestTypes['getAllFilters']) => {
    return {
      queryKey: [1],
      queryFn: async () => {
        const { data } = await APIAxiosInstance.get(`/filters`)

        return data
      },
    }
  },
})
