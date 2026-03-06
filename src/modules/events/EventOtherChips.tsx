import React, { memo } from 'react'
import { LocationOn, Sell } from '@mui/icons-material'
import { Chip, useTheme } from '@mui/material'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
import { Event } from 'src/core/react-query/features/events/types'

type EventOtherChipsProps = {
  event: Event
}

export const EventOtherChips: React.FC<EventOtherChipsProps> = memo(
  ({ event }) => {
    const theme = useTheme()
    const startDate = dayjs.utc(event.start).local().format('D MMM YYYY, HH:mm')
    const endDate = dayjs.utc(event.end).local().format('D MMM YYYY, HH:mm')

    const locationText = [event.country_name, event.city_name]
      .filter(Boolean)
      .join(', ')

    return (
      <>
        {locationText && (
          <Chip
            color='info'
            variant='outlined'
            avatar={<LocationOn />}
            sx={{
              mb: 1,
              mr: 1,
              '.MuiChip-avatar': {
                color: theme.palette.primary.main,
              },
            }}
            label={locationText}
          />
        )}
        <Chip
          color='info'
          variant='outlined'
          avatar={<Sell />}
          sx={{
            mb: 1,
            mr: 1,
            '.MuiChip-avatar': {
              color: theme.palette.primary.main,
            },
          }}
          label={event.entry_type}
        />
      </>
    )
  },
)

EventOtherChips.displayName = 'EventOtherChips'
