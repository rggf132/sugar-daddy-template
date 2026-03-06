'use client'

import {
  TextField,
  Box,
  BoxProps,
  InputAdornment,
  CircularProgress,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Search as SearchIcon } from '@mui/icons-material'
import { useDebouncedValue } from 'src/core/helpers/useDebouncedValue'
import { useIsFetching, QueryKey } from '@tanstack/react-query'
import { domainConfig } from 'src/domain.config'

type SearchTermFilterProps = {
  sx?: BoxProps
  type: string
  queryKey?: QueryKey
}

const SearchTermFilter: React.FC<SearchTermFilterProps> = ({
  type,
  sx,
  queryKey,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const [searchTerm, setSearchTerm] = useState(searchParams?.get(type) || '')
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300)

  const fetchingFilter = queryKey ? { queryKey } : {}
  const isFetching = useIsFetching(fetchingFilter)

  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams.toString())
    queryParams.set(type, debouncedSearchTerm)

    if (debouncedSearchTerm === '') queryParams.delete(type)

    router.push(pathName + '?' + queryParams.toString())
  }, [debouncedSearchTerm])

  return (
    <Box {...sx}>
      <TextField
        fullWidth
        placeholder={domainConfig.listing.searchPlaceholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              {isFetching ? (
                <CircularProgress size={20} color='primary' />
              ) : (
                <SearchIcon color='action' />
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}
export default SearchTermFilter
