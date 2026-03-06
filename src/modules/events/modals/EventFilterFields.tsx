'use client'

import { Autocomplete, MenuItem, TextField } from '@mui/material'
import { Controller, Control, UseFormSetValue } from 'react-hook-form'
import {
  Filter,
  FilterData,
  useGetAllFilters,
} from 'src/core/react-query/features/filters'
import { CountryCityFormField } from 'src/elements/filters/CountryCityFormField'
import { EventFormValues } from './useEventForm'

interface EventFilterFieldsProps {
  control: Control<EventFormValues>
  setValue: UseFormSetValue<EventFormValues>
  categoryId: string
}

export const EventFilterFields: React.FC<EventFilterFieldsProps> = ({
  control,
  setValue,
  categoryId,
}) => {
  const { data: filters = [] } = useGetAllFilters({})

  return (
    <>
      {(filters as Filter[]).map((filter: Filter) => {
        const isSubcategoryFilter = filter.type === 'subCategory'
        const options = isSubcategoryFilter
          ? filter.data.filter(
              (subCategory: FilterData) =>
                subCategory.category_id == categoryId,
            )
          : filter.data
        return (
          <Controller
            key={filter.type}
            control={control}
            name={filter.createEventType}
            rules={{
              required: `Please select ${filter.name}`,
            }}
            render={({ field, fieldState: { error } }) => {
              const value =
                filter.type === 'subCategory'
                  ? options?.filter((item: FilterData) =>
                      (field.value as number[])?.find(
                        (paramOption) => paramOption == Number(item.id),
                      ),
                    ) || []
                  : options?.find(
                      (item: FilterData) => item.id == field.value,
                    ) || null

              return (
                <Autocomplete
                  disabled={isSubcategoryFilter && categoryId === ''}
                  disablePortal
                  id={filter.type}
                  value={value}
                  options={options}
                  multiple={isSubcategoryFilter}
                  sx={{ mt: 1 }}
                  getOptionLabel={(option: FilterData) => option.type ?? ''}
                  renderOption={(props, option: FilterData) => (
                    <MenuItem {...props} key={option.id} value={option.type}>
                      {option.type}
                    </MenuItem>
                  )}
                  renderInput={(params) => {
                    const textfieldParams = {
                      ...params,
                      inputProps: {
                        ...params.inputProps,
                        value:
                          params.inputProps.value === 'undefined'
                            ? ''
                            : params.inputProps.value,
                      },
                    }

                    return (
                      <TextField
                        {...textfieldParams}
                        label={filter.name}
                        helperText={error?.message}
                        error={!!error}
                      />
                    )
                  }}
                  onChange={(e, value, reason) => {
                    if (value) {
                      if (Array.isArray(value)) {
                        field.onChange(value.map((item) => item.id))
                      } else {
                        field.onChange(value.id)
                      }
                    } else field.onChange('')

                    if (filter.type === 'category') {
                      setValue('subCategoryIds', [])
                    }
                  }}
                />
              )
            }}
          />
        )
      })}

      <CountryCityFormField control={control} name='location' sx={{ mt: 1 }} />
    </>
  )
}
