'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import {
  Box,
  TextField,
  BoxProps,
  Tooltip,
  ListItem,
  ListItemText,
  LinearProgress,
  Autocomplete,
} from '@mui/material'
import { useGetAllCountries } from 'src/core/react-query/features/countries/hooks/useGetAllCountries'
import { useGetCitiesByCountry } from 'src/core/react-query/features/countries/hooks/useGetCitiesByCountry'
import { Country, City } from 'src/core/react-query/features/countries/types'
import { keepPreviousData } from '@tanstack/react-query'

type CountryCityFilterProps = {
  sx?: BoxProps
}

export const CountryCityFilter: React.FC<CountryCityFilterProps> = ({ sx }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const [countrySearchTerm, setCountrySearchTerm] = useState('')
  const [citySearchTerm, setCitySearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)

  // Get the selected country from URL params
  const selectedCountryId = searchParams.get('countryId')
  const selectedCityId = searchParams.get('cityId')

  // Get countries with search
  const {
    data: countries = [],
    isLoading: countriesLoading,
    isFetching: countriesFetching,
  } = useGetAllCountries(
    { search: countrySearchTerm || undefined },
    {
      enabled: true,
      placeholderData: keepPreviousData,
    },
  )

  // Set selected country from URL params on mount
  useEffect(() => {
    if (selectedCountryId && countries.length > 0) {
      const country = (countries as Country[]).find(
        (c: Country) => c.id.toString() === selectedCountryId,
      )
      if (country) {
        setSelectedCountry(country)
      }
    }
  }, [selectedCountryId, countries])

  // Get cities for selected country with search
  const {
    data: cities = [],
    isLoading: citiesLoading,
    isFetching: citiesFetching,
  } = useGetCitiesByCountry(
    {
      country: selectedCountry?.name || 'placeholder', // Use placeholder when we only have cityId
      search: citySearchTerm || undefined,
      cityId: selectedCityId || undefined,
    },
    {
      enabled: !!(selectedCountry?.name || selectedCityId),
      placeholderData: keepPreviousData,
    },
  )

  // Get selected city from URL params
  const selectedCity = (cities as City[]).find(
    (city: City) => city.id.toString() === selectedCityId,
  )

  const handleCountryChange = (country: Country | null) => {
    setSelectedCountry(country)
    setCitySearchTerm('')

    const queryParams = new URLSearchParams(searchParams.toString())
    if (country) {
      queryParams.set('countryId', country.id.toString())
    } else {
      queryParams.delete('countryId')
    }
    queryParams.delete('cityId') // Clear city when country changes

    router.push(pathName + '?' + queryParams.toString())
  }

  const handleCityChange = (city: City | null) => {
    const queryParams = new URLSearchParams(searchParams.toString())
    if (city) {
      queryParams.set('cityId', city.id.toString())
    } else {
      queryParams.delete('cityId')
    }

    router.push(pathName + '?' + queryParams.toString())
  }

  return (
    <Box {...sx} sx={{ width: '100%', ...sx }}>
      {/* Country Autocomplete */}
      <Box position='relative' sx={{ mb: 1 }}>
        <Autocomplete
          id='country-filter'
          options={countries}
          getOptionLabel={(option) => option.name}
          value={selectedCountry}
          onChange={(_, newValue) => handleCountryChange(newValue)}
          onInputChange={(_, newInputValue) =>
            setCountrySearchTerm(newInputValue)
          }
          renderOption={(props, option, { index }) => (
            <>
              {countriesFetching && index === 0 && (
                <LinearProgress
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    height: 4,
                  }}
                />
              )}
              <ListItem {...props} key={option.id}>
                <ListItemText primary={option.name} />
              </ListItem>
            </>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Country'
              variant='outlined'
              fullWidth
              size='small'
            />
          )}
          filterOptions={(x) => x} // Disable built-in filtering since we do it on backend
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
      </Box>

      {/* City Autocomplete */}
      <Tooltip
        title={!selectedCountry ? 'Please select a country first' : ''}
        placement='top'
      >
        <Box position='relative'>
          <Autocomplete
            id='city-filter'
            options={cities}
            getOptionLabel={(option) => option.name}
            value={selectedCity || null}
            onChange={(_, newValue) => handleCityChange(newValue)}
            onInputChange={(_, newInputValue) =>
              setCitySearchTerm(newInputValue)
            }
            disabled={!selectedCountry}
            renderOption={(props, option, { index }) => (
              <>
                {citiesFetching && index === 0 && (
                  <LinearProgress
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 0,
                      right: 0,
                      zIndex: 1,
                      height: 4,
                    }}
                  />
                )}
                <ListItem {...props} key={option.id}>
                  <ListItemText primary={option.name} />
                </ListItem>
              </>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label='City'
                variant='outlined'
                fullWidth
                size='small'
                disabled={!selectedCountry}
              />
            )}
            filterOptions={(x) => x} // Disable built-in filtering since we do it on backend
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        </Box>
      </Tooltip>
    </Box>
  )
}
