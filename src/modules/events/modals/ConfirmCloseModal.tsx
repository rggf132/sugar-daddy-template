import React from 'react'
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import { useModal } from 'src/components/GlobalModal'
import { LoadingButton } from '@mui/lab'
import { Clear } from '@mui/icons-material'

export const ConfirmCloseModal: React.FC = () => {
  const { hideModal, hideAllModals } = useModal()

  return (
    <>
      <DialogTitle
        variant='h5'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        sx={{ pr: 1, fontSize: 20 }}
      >
        Are you sure?
        <IconButton aria-label='close-modal' onClick={hideModal} sx={{ mr: 1 }}>
          <Clear />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography variant='body1' sx={{ mb: 2 }}>
          Are you sure you want to discard your changes?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ pb: 2, pr: 3 }}>
        <LoadingButton variant='contained' onClick={hideAllModals}>
          Discard
        </LoadingButton>
      </DialogActions>
    </>
  )
}
