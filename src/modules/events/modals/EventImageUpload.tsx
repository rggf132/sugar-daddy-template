'use client'

import React from 'react'
import { Button, IconButton, Tooltip, alpha, useTheme } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import { Controller, Control, UseFormSetValue } from 'react-hook-form'
import { Flex } from 'src/components/Flex'
import { useModal } from 'src/components/GlobalModal'
import { ImagePreviewModal } from './ImagePreviewModal'
import { EventFormValues } from './useEventForm'

interface EventImageUploadProps {
  control: Control<EventFormValues>
  setValue: UseFormSetValue<EventFormValues>
  imageUrl: string
  imageFile: File | null
  onFileChange: (file: File | null) => void
}

export const EventImageUpload: React.FC<EventImageUploadProps> = ({
  control,
  setValue,
  imageUrl,
  imageFile,
  onFileChange,
}) => {
  const theme = useTheme()
  const { showModal } = useModal()

  const previewSrc = imageFile ? URL.createObjectURL(imageFile) : imageUrl

  return (
    <>
      <Button
        sx={{ mt: 1, width: '50%' }}
        variant='contained'
        component='label'
      >
        Upload Image
        <Controller
          control={control}
          name='imageUrl'
          render={({ field }) => (
            <input
              hidden
              accept='image/*'
              type='file'
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) {
                  field.onChange(file)
                  onFileChange(file)
                }
              }}
            />
          )}
        />
      </Button>
      {(imageUrl || imageFile) && (
        <Flex
          sx={{ mt: 1, border: '1px solid #bdbdbd' }}
          flexDirection='column'
          position='relative'
        >
          <img
            src={previewSrc}
            alt='event-image'
            height='300'
            style={{
              margin: '8px',
              backgroundColor: 'black',
              objectFit: 'contain',
            }}
          />
          <Tooltip title='Image preview'>
            <IconButton
              color='primary'
              sx={{
                m: 1,
                top: '4px',
                right: '4px',
                position: 'absolute',
                '&:hover': {
                  cursor: 'pointer',
                  backgroundColor: alpha(theme.palette.primary.main, 0.5),
                },
              }}
              onClick={() =>
                showModal(<ImagePreviewModal imageUrl={previewSrc} />, {
                  PaperProps: {
                    sx: { maxWidth: '70%', maxHeight: '90%' },
                  },
                })
              }
            >
              <ZoomOutMapIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete image'>
            <IconButton
              color='error'
              sx={{
                m: 1,
                top: '48px',
                right: '4px',
                position: 'absolute',
                '&:hover': {
                  cursor: 'pointer',
                  backgroundColor: alpha(theme.palette.error.light, 0.3),
                },
              }}
              onClick={() => {
                onFileChange(null)
                setValue('file_key', '')
                setValue('file_type', '')
                setValue('imageUrl', '')
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Flex>
      )}
    </>
  )
}
