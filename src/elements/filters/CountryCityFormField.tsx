import React, { useState } from 'react'
import {
  Box,
  Autocomplete,
  TextField,
  BoxProps,
  Tooltip,
  ListItem,
  ListItemText,
  LinearProgress,
} from '@mui/material'
import { Controller, Control, FieldError, useWatch } from 'react-hook-form'
import { useGetAllCountries } from 'src/core/react-query/features/countries/hooks/useGetAllCountries'
import { useGetCitiesByCountry } from 'src/core/react-query/features/countries/hooks/useGetCitiesByCountry'
import { Country, City } from 'src/core/react-query/features/countries/types'
import { keepPreviousData } from '@tanstack/react-query'

type CountryCityFormFieldProps = {
  control: Control<any>
  name: string
  label?: string
  error?: FieldError
  sx?: BoxProps
}

export const CountryCityFormField: React.FC<CountryCityFormFieldProps> = ({
  control,
  name,
  label = 'Location',
  error,
  sx,
}) => {
  const [countrySearchTerm, setCountrySearchTerm] = useState('')
  const [citySearchTerm, setCitySearchTerm] = useState('')

  // Watch the form field values
  const countryId = useWatch({ control, name: 'countryId' })
  const cityId = useWatch({ control, name: 'cityId' })

  // Get countries with search
  const { data: countries = [], isFetching: countriesFetching } =
    useGetAllCountries(
      { search: countrySearchTerm || undefined },
      {
        enabled: true,
        placeholderData: keepPreviousData,
      },
    )

  // Get the selected country from the form value
  const selectedCountry =
    (countries as Country[]).find(
      (c: Country) => c.id.toString() === countryId,
    ) || null

  // Get cities for selected country with search
  const { data: cities = [], isFetching: citiesFetching } =
    useGetCitiesByCountry(
      {
        country: selectedCountry?.name || '',
        search: citySearchTerm || undefined,
      },
      {
        enabled: !!selectedCountry?.name,
        placeholderData: keepPreviousData,
      },
    )

  return (
    <Box {...sx}>
      {/* Country Autocomplete */}
      <Controller
        control={control}
        name='countryId'
        rules={{ required: 'Please select a country' }}
        render={({ field, fieldState: { error: countryError } }) => {
          const selectedCountryValue = (countries as Country[]).find(
            (country: Country) => country.id.toString() === countryId,
          )

          return (
            <Box position='relative'>
              <Autocomplete
                id='country-form-field'
                options={countries}
                getOptionLabel={(option) => option.name}
                value={selectedCountryValue || null}
                onChange={(_, newValue) => {
                  setCitySearchTerm('')
                  field.onChange(newValue?.id?.toString() || '')
                }}
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
                    sx={{ mb: 1 }}
                    error={!!countryError}
                    helperText={countryError?.message}
                  />
                )}
                filterOptions={(x) => x} // Disable built-in filtering since we do it on backend
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
            </Box>
          )
        }}
      />

      {/* City Autocomplete */}
      <Controller
        control={control}
        name='cityId'
        rules={{ required: 'Please select a city' }}
        render={({ field, fieldState: { error: cityError } }) => {
          const selectedCityValue = (cities as City[]).find(
            (city: City) => city.id.toString() === cityId,
          )

          return (
            <Tooltip
              title={!selectedCountry ? 'Please select a country first' : ''}
              placement='top'
            >
              <Box position='relative'>
                <Autocomplete
                  id='city-form-field'
                  options={cities}
                  getOptionLabel={(option) => option.name}
                  value={selectedCityValue || null}
                  onChange={(_, newValue) => {
                    field.onChange(newValue?.id?.toString() || '')
                  }}
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
                      disabled={!selectedCountry}
                      error={!!cityError}
                      helperText={cityError?.message}
                    />
                  )}
                  filterOptions={(x) => x} // Disable built-in filtering since we do it on backend
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />
              </Box>
            </Tooltip>
          )
        }}
      />
    </Box>
  )
}
