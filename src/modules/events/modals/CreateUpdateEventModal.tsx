'use client'

import React from 'react'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { useModal } from 'src/components/GlobalModal'
import { Clear } from '@mui/icons-material'
import { Event } from 'src/core/react-query/features/events/types'
import { LoadingButton } from '@mui/lab'
import { ConfirmCloseModal } from './ConfirmCloseModal'
import { EventFormFields } from './EventFormFields'
import { EventFilterFields } from './EventFilterFields'
import { EventImageUpload } from './EventImageUpload'
import { useEventForm } from './useEventForm'

type CreateUpdateEventModalProps = {
  event?: Event
  modalTitle?: string
}

export const CreateUpdateEventModal: React.FC<CreateUpdateEventModalProps> = ({
  event,
  modalTitle,
}) => {
  const { showModal, hideModal } = useModal()
  const {
    form,
    imageFile,
    setImageFile,
    categoryId,
    imageUrl,
    isMutating,
    onSubmit,
    isUpdate,
  } = useEventForm(event)

  const {
    register,
    control,
    setValue,
    formState: { errors, isDirty },
  } = form

  const handleClose = () => {
    if (isDirty) {
      showModal(<ConfirmCloseModal />, {
        PaperProps: { sx: { maxWidth: '20%' } },
      })
    } else {
      hideModal()
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <DialogTitle
        variant='h5'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        sx={{ pr: 1, fontSize: 20 }}
      >
        {modalTitle}
        <IconButton aria-label='close-modal' onClick={handleClose}>
          <Clear />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box display='flex' flexDirection='column'>
          <EventFormFields
            register={register}
            control={control}
            errors={errors}
          />
          <EventFilterFields
            control={control}
            setValue={setValue}
            categoryId={categoryId}
          />
          <EventImageUpload
            control={control}
            setValue={setValue}
            imageUrl={imageUrl}
            imageFile={imageFile}
            onFileChange={setImageFile}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ pb: 2, pr: 3 }}>
        <Button disabled={isMutating} variant='outlined' onClick={handleClose}>
          Cancel
        </Button>
        <LoadingButton loading={isMutating} variant='contained' type='submit'>
          {isUpdate ? 'Update' : 'Create'}
        </LoadingButton>
      </DialogActions>
    </form>
  )
}
