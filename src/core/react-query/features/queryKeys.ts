import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { eventsKeys } from './events'
import { countriesKeys } from './countries'
import { filtersKeys } from './filters'

export const queryKeys = mergeQueryKeys(eventsKeys, countriesKeys, filtersKeys)
