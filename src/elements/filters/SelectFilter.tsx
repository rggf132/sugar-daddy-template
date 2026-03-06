'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Box, TextField, BoxProps, MenuItem, Autocomplete } from '@mui/material'

type SelectFilterProps = {
  sx?: BoxProps
  type: string
  options: any[]
  label: string
  disabled: boolean
}

export const SelectFilter: React.FC<SelectFilterProps> = ({
  sx,
  type,
  options,
  label,
  disabled,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const value =
    type === 'subCategory'
      ? options?.filter((item) =>
          searchParams
            .get(type)
            ?.split(',')
            ?.find((paramOption) => paramOption == item.id),
        ) || []
      : options?.find((item) => item.id == searchParams.get(type)) || null

  return (
    <Box {...sx} sx={{ width: '100%', ...sx }}>
      <Autocomplete
        disabled={disabled}
        disablePortal
        id={type}
        options={options}
        multiple={type === 'subCategory' ? true : false}
        size='small'
        value={value}
        getOptionLabel={(option) => option.type ?? ''}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.id} value={option}>
            {option.type}
          </MenuItem>
        )}
        onChange={(e, value, reason) => {
          const queryParams = new URLSearchParams(searchParams.toString())
          if (value) {
            if (Array.isArray(value)) {
              queryParams.set(type, value.map((item) => item.id).join(','))
            } else {
              queryParams.set(type, value.id)
            }
          } else queryParams.delete(type)

          if (!queryParams.get('category')) {
            queryParams.delete('subCategory')
          }

          router.push(pathName + '?' + queryParams.toString())
        }}
        renderInput={(params) => {
          const textfieldParams = {
            ...params,
            inputProps: {
              ...params.inputProps,
              value:
                params.inputProps.value === 'undefined' ||
                (type === 'subCategory' && !searchParams.get('category'))
                  ? ''
                  : params.inputProps.value,
            },
          }

          return <TextField {...textfieldParams} label={label} size='small' />
        }}
      />
    </Box>
  )
}
