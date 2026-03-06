import React, { memo } from 'react'
import { Box, Chip, Typography, styled } from '@mui/material'
import { sx } from 'src/core/helpers/sx'
import { Event } from 'src/core/react-query/features/events/types'

type EventCategoryChipsProps = {
  event: Event
}

const WrappableChip = styled(Chip)(
  sx({
    py: 0.5,
    px: 0,
    height: 'fit-content',
    display: 'flex',
    width: 'fit-content',
    flexDirection: 'row',
    '& .MuiChip-label': {
      overflowWrap: 'break-word',
      whiteSpace: 'normal',
      textOverflow: 'clip',
    },
  }),
)

const getChipColor = (categoryId: number) => {
  switch (categoryId) {
    case 1:
      return 'primary'
    case 2:
      return 'secondary'
    case 3:
      return 'warning'
    case 4:
      return 'info'
    case 5:
      return 'success'
    case 6:
      return 'error'
    case 7:
      return 'ochre'
    case 8:
      return 'violet'
    default:
      return 'default'
  }
}

export const EventCategoryChips: React.FC<EventCategoryChipsProps> = memo(
  ({ event }) => {
    return (
      <Box mt={1}>
        <WrappableChip
          sx={{ mt: 1 }}
          color={getChipColor(Number(event.category_id))}
          label={
            <Typography fontSize={14}>
              <Typography component='span' fontSize={14} fontWeight='bold'>
                {`Category: `}
              </Typography>
              {event.category_type}
            </Typography>
          }
        />
        <WrappableChip
          sx={{ mt: 1 }}
          label={
            <Typography fontSize={14}>
              <Typography component='span' fontSize={14} fontWeight='bold'>
                {`Sub Categories: `}
              </Typography>
              {event.sub_category_types?.split(',').join(', ')}
            </Typography>
          }
        />
      </Box>
    )
  },
)

EventCategoryChips.displayName = 'EventCategoryChips'
