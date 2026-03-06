import React from 'react'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { useModal } from 'src/components/GlobalModal'
import { Clear } from '@mui/icons-material'
import { Event } from 'src/core/react-query/features/events/types'
import dayjs from 'dayjs'

export const EventDetailsModal: React.FC<{
  event: Event
}> = ({ event }) => {
  const { hideModal } = useModal()

  const startDate = dayjs(event.start).format('MMMM D YYYY, h:mm:ss a')
  const endDate = dayjs(event.end).format('MMMM D YYYY, h:mm:ss a')
  const createdAt = dayjs(event.created_at).format('MMMM D YYYY, h:mm:ss a')
  const updatedAt = dayjs(event.modified_at).format('MMMM D YYYY, h:mm:ss a')

  return (
    <>
      <DialogTitle
        variant='h5'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        sx={{ pr: 1, fontSize: 20 }}
      >
        {event.title}
        <IconButton aria-label='close-modal' onClick={hideModal}>
          <Clear />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography>{event.title}</Typography>
        <Typography>{event.description}</Typography>
        <Typography>{event.category_type}</Typography>
        <Typography>{event.location_type}</Typography>
        <Typography>
          {event.sub_category_types?.split(',').join(', ')}
        </Typography>
        <Typography>{startDate}</Typography>
        <Typography>{endDate}</Typography>
        <Typography>{event.entry_type}</Typography>
        <Typography>{createdAt}</Typography>
        <Typography>{updatedAt}</Typography>
      </DialogContent>

      <DialogActions sx={{ pb: 2, pr: 3 }}>
        <Button variant='outlined' onClick={hideModal}>
          Close
        </Button>
      </DialogActions>
    </>
  )
}
