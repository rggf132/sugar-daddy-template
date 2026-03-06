import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { DarkMode } from '@mui/icons-material'

// Server-side only ThemeToggle - no client features
export const ThemeToggle: React.FC = () => (
  <Tooltip title='Switch theme'>
    <IconButton
      sx={{
        width: 40,
        height: 40,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        color: '#6366F1',
        '&:hover': {
          backgroundColor: 'rgba(99, 102, 241, 0.15)',
          transform: 'scale(1.05)',
        },
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <DarkMode sx={{ fontSize: 20 }} />
    </IconButton>
  </Tooltip>
)
