'use client'

import React, { useMemo } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import { Box, BoxProps, Typography, Button, Card } from '@mui/material'
import Dropzone from 'react-dropzone'
import { Flex } from './Flex'
import { CloudUpload } from '@mui/icons-material'

export enum AttachmentTypes {
  IMAGE = 'image',
}

type AttachmentInputProps = BoxProps & {
  inputProps?: Partial<ControllerRenderProps>
  readOnly?: boolean
  attachmentTypes?: AttachmentTypes[]
}

const AttachmentInput: React.FC<AttachmentInputProps> = ({
  inputProps: { value = [], onChange, ...inputProps } = {},
  readOnly = false,
  attachmentTypes,
}) => {
  const [localValue, setLocalValue] =
    React.useState<Array<Blob & { uri?: string; key?: string }>>(value)

  const acceptTypes = useMemo(() => {
    const types: Record<string, string[]> = {}
    attachmentTypes?.forEach((attachmentInput) => {
      if (attachmentInput === AttachmentTypes.IMAGE) {
        types['image/png'] = ['.png']
        types['image/jpeg'] = ['.jpeg']
        types['image/jpg'] = ['.jpg']
      }
    })
    return types
  }, [attachmentTypes])

  const onDrop = (newAttachments: Array<Blob & { uri?: string }>) => {
    const newProofsWithUri = newAttachments.map((file) => {
      file.uri = URL.createObjectURL(file)
      return file
    })

    setLocalValue(newProofsWithUri)
    onChange?.(newProofsWithUri)
  }

  // if (readOnly && !value?.length) return null

  return (
    <Box mt={2}>
      {!readOnly && (
        <Dropzone accept={acceptTypes} onDrop={onDrop} maxFiles={5}>
          {({ getRootProps, getInputProps }) => {
            return (
              <Flex
                height={120}
                border='1px dashed'
                borderColor={'silver'}
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                borderRadius={1}
                {...getRootProps()}
              >
                <CloudUpload color='primary' fontSize='large' />
                <Typography sx={{ color: 'text.secondary' }}>
                  {`Drag your file here or `}
                  <Typography
                    color='primary'
                    sx={{ cursor: 'pointer' }}
                    component='span'
                  >
                    click to upload
                    <input hidden {...getInputProps()} />
                  </Typography>
                </Typography>
              </Flex>
            )
          }}
        </Dropzone>
      )}
      <Flex flexWrap='wrap'>
        {(value ?? []).map(
          (
            proof: Blob & { uri?: string; downloadUrl?: string },
            index: number,
          ) => {
            return (
              <Card key={index} sx={{ p: 2, mr: 1.5, mt: 1.5 }}>
                <Flex
                  height={200}
                  width={300}
                  overflow='hidden'
                  sx={{ 'img': { height: '100%', 'object-fit': 'scale-down' } }}
                  bgcolor='black'
                  borderRadius={1}
                  justifyContent='center'
                  alignItems='center'
                  data-test={`upload-thumbnail-${index}`}
                >
                  <Box height='100%'>
                    <img
                      src={proof.uri || proof.downloadUrl}
                      style={{
                        pointerEvents: 'none',
                        objectFit: 'cover',
                        height: '100%',
                        width: '100%',
                      }}
                    />
                  </Box>
                </Flex>
                {!readOnly && (
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={() => {
                      const current = value ?? []
                      const updated = current.filter(
                        (
                          _: Blob & { uri?: string; downloadUrl?: string },
                          i: number,
                        ) => i !== index,
                      )
                      setLocalValue(updated)
                      onChange?.(updated)
                    }}
                    sx={{ mt: 1.5, float: 'right' }}
                    data-test={`upload-thumbnail-delete-btn-${index}`}
                  >
                    Delete
                  </Button>
                )}
              </Card>
            )
          },
        )}
      </Flex>
    </Box>
  )
}

export { AttachmentInput }
