'use client'

import { Box, useTheme } from '@mui/material'
import Image from 'next/image'

interface EventImageProps {
  imageUrl?: string
  title: string
}

export const EventImage: React.FC<EventImageProps> = ({ imageUrl, title }) => {
  const theme = useTheme()

  if (imageUrl) {
    return (
      <Box
        sx={{
          width: '100%',
          height: 400,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes='(max-width: 1200px) 100vw, 1200px'
          style={{ objectFit: 'cover' }}
          priority
        />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: 'calc(100% - 48px)',
        height: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:
          theme.palette.mode === 'light'
            ? 'rgba(0, 0, 0, 0.04)'
            : 'rgba(255, 255, 255, 0.04)',
        borderRadius: 2,
        mx: 3,
        mt: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <img
          src='/placeholder-image.png'
          alt='placeholder'
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '150px',
            maxHeight: '85px',
            objectFit: 'contain',
          }}
        />
      </Box>
    </Box>
  )
}
