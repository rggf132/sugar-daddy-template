'use client'

import React, { forwardRef, Ref, useState } from 'react'
import { addDays, startOfDay } from 'date-fns'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { Close } from '@mui/icons-material'
import DatePicker from 'react-datepicker'
import { FieldError } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'

type DateRangeValue = { startTime: string | null; endTime: string | null }

type DateRangeProps = {
  onChange: (value: DateRangeValue) => void
  onCalendarClose: () => void
  value?: DateRangeValue | null
  error?: FieldError
}

export const DateRange: React.FC<DateRangeProps> = ({
  onChange,
  onCalendarClose,
  value,
  error,
}) => {
  const [dateRange, setDateRange] = useState<{
    startTime: Date | null
    endTime: Date | null
  }>(() => {
    const v = value ?? { startTime: null, endTime: null }
    return {
      startTime: v.startTime ? new Date(v.startTime) : null,
      endTime: v.endTime ? new Date(v.endTime) : null,
    }
  })

  const _onChange = (dates: [Date | null, Date | null] | null) => {
    if (Array.isArray(dates)) {
      const [start, end] = dates
      setDateRange({ startTime: start ?? null, endTime: end ?? null })

      if (!start && !end) {
        setDateRange({ startTime: null, endTime: null })
        onChange({ startTime: null, endTime: null })
      }
    }
  }

  const _onCalendarClose = () => {
    if (dateRange.startTime && dateRange.endTime) {
      onChange({
        startTime: startOfDay(new Date(dateRange.startTime)).toISOString(),
        endTime: startOfDay(
          addDays(new Date(dateRange.endTime), 1),
        ).toISOString(),
      })
    }
    onCalendarClose()
  }

  const MuiInput = forwardRef((props, ref: Ref<HTMLDivElement>) => (
    <TextField
      sx={{ mt: 1 }}
      fullWidth
      label='Date Range'
      ref={ref}
      InputProps={{
        endAdornment: (value?.startTime ?? value?.endTime) && (
          <InputAdornment position='end'>
            <IconButton
              onClick={() => {
                setDateRange({ startTime: null, endTime: null })
                onChange({ startTime: null, endTime: null })
              }}
            >
              <Close />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
      error={!!error}
      helperText={error?.message}
    />
  ))

  return (
    <Box
      sx={{
        '& .react-datepicker-wrapper': {
          width: '100%',
        },
        '& .react-datepicker-popper': {
          zIndex: '11 !important',
        },
      }}
    >
      <DatePicker
        customInput={<MuiInput />}
        onChange={_onChange}
        onCalendarClose={_onCalendarClose}
        startDate={dateRange.startTime ?? undefined}
        endDate={dateRange.endTime ?? undefined}
        selectsRange
        dateFormat='yyyy-MM-dd'
      />
    </Box>
  )
}
