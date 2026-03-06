'use client'

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
import { useToast } from 'src/core/toast'
import { LoadingButton } from '@mui/lab'
import { useDeleteEvent } from 'src/core/react-query/features/events/hooks/useDeleteEvent'
import { PageUrls } from 'src/core/page-urls'
import { useRouter } from 'next/navigation'

type DeleteEventModalProps = {
  eventId: number
  file_key?: string
}

export const DeleteEventModal: React.FC<DeleteEventModalProps> = ({
  eventId,
  file_key,
}) => {
  const router = useRouter()
  const { hideModal } = useModal()
  const toast = useToast()
  const deleteEvent = useDeleteEvent()

  const handleDeleteEvent = () => {
    deleteEvent.mutate(
      { eventId, file_key: file_key ?? '' },
      {
        onError: () => toast.error('Error deleting event'),
        onSuccess: () => {
          toast.success('Event deleted successfully')
          hideModal()
          router.push(PageUrls.home())
        },
      },
    )
  }

  return (
    <>
      <DialogTitle
        variant='h5'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        sx={{ pr: 1, fontSize: 20 }}
      >
        Delete event
        <IconButton aria-label='close-modal' onClick={hideModal}>
          <Clear />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant='body1' sx={{ mb: 2 }}>
          Are you sure you want to delete this event?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ pb: 2, pr: 3 }}>
        <Button
          disabled={deleteEvent.isPending}
          variant='outlined'
          onClick={hideModal}
        >
          Cancel
        </Button>
        <LoadingButton
          loading={deleteEvent.isPending}
          variant='contained'
          color='error'
          onClick={handleDeleteEvent}
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </>
  )
}
