import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

type BackdropLoaderProps = {
  open: boolean
}
export const BackdropLoader: React.FC<BackdropLoaderProps> = ({ open }) => {
  return (
    <Backdrop
      sx={{ zIndex: 10, backgroundColor: '#BAD6FF3F', opacity: 0.2 }}
      open={open}
    >
      <CircularProgress />
    </Backdrop>
  )
}
