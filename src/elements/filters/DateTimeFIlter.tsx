'use client'

import { Box } from '@mui/material'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

type DateTimeFilterProps = {
  label: string
  type: string
  sx?: any
}

export const DateTimeFilter: React.FC<DateTimeFilterProps> = ({
  label,
  type,
  sx,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const value = searchParams.get(type)
    ? dayjs.utc(searchParams.get(type)).local()
    : null

  return (
    <Box sx={{ width: '100%', mb: 1, ...sx }}>
      <DateTimePicker
        label={label}
        timezone='system'
        value={value}
        ampm={false}
        disablePast
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        }}
        slotProps={{
          field: {
            clearable: true,
            onClear: (e) => {
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
            size: 'small',
            fullWidth: true,
          },
        }}
        onChange={(value: Dayjs | null) => {
          const queryParams = new URLSearchParams(searchParams.toString())

          if (value === null) {
            queryParams.delete(type)
          } else {
            queryParams.set(type, value.toISOString())
          }

          router.push(pathName + '?' + queryParams.toString())
        }}
      />
    </Box>
  )
}
