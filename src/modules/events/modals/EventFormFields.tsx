'use client'

import { TextField } from '@mui/material'
import {
  Controller,
  Control,
  UseFormRegister,
  FieldErrors,
} from 'react-hook-form'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs'
import { Flex } from 'src/components/Flex'
import { EventFormValues } from './useEventForm'

interface EventFormFieldsProps {
  register: UseFormRegister<EventFormValues>
  control: Control<EventFormValues>
  errors: FieldErrors<EventFormValues>
}

export const EventFormFields: React.FC<EventFormFieldsProps> = ({
  register,
  control,
  errors,
}) => {
  return (
    <>
      <TextField
        sx={{ mt: 1 }}
        label='Title'
        inputProps={register('title', {
          required: 'Please write a title for your event',
        })}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <TextField
        sx={{ mt: 1 }}
        label='Description'
        inputProps={register('description', {
          required: 'Please write a description for your event',
        })}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <Flex gap={1}>
        <Controller
          control={control}
          name='start'
          rules={{
            validate: (start) => (start ? true : 'Please select a date range'),
          }}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              sx={{ mt: 1 }}
              ampm={false}
              timezone='system'
              disablePast
              value={field.value ? dayjs(field.value) : null}
              slotProps={{
                field: {
                  clearable: true,
                  onClear: (e: React.SyntheticEvent) => {
                    const input =
                      e.currentTarget.parentElement?.parentElement?.querySelector(
                        'input',
                      )
                    setTimeout(() => {
                      input?.blur()
                    })
                  },
                },
                textField: {
                  fullWidth: true,
                  helperText: error?.message,
                  error: !!error,
                },
              }}
              label='Start Date'
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name='end'
          rules={{
            validate: (end) => (end ? true : 'Please select a date range'),
          }}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              sx={{ mt: 1 }}
              ampm={false}
              timezone='system'
              disablePast
              value={field.value ? dayjs(field.value) : null}
              slotProps={{
                field: {
                  clearable: true,
                  onClear: (e: React.SyntheticEvent) => {
                    const input =
                      e.currentTarget.parentElement?.parentElement?.querySelector(
                        'input',
                      )
                    setTimeout(() => {
                      input?.blur()
                    })
                  },
                },
                textField: {
                  fullWidth: true,
                  helperText: error?.message,
                  error: !!error,
                },
              }}
              label='End Date'
              onChange={field.onChange}
            />
          )}
        />
      </Flex>
    </>
  )
}
