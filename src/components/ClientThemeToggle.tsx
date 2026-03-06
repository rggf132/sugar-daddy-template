'use client'

import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { LightMode, DarkMode } from '@mui/icons-material'
import { useTheme } from 'src/core/theme/ThemeProvider'

export const ClientThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useTheme()

  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          width: 40,
          height: 40,
          backgroundColor:
            mode === 'light'
              ? 'rgba(99, 102, 241, 0.1)'
              : 'rgba(129, 140, 248, 0.2)',
          color: mode === 'light' ? '#6366F1' : '#818CF8',
          '&:hover': {
            backgroundColor:
              mode === 'light'
                ? 'rgba(99, 102, 241, 0.15)'
                : 'rgba(129, 140, 248, 0.3)',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {mode === 'light' ? (
          <DarkMode sx={{ fontSize: 20 }} />
        ) : (
          <LightMode sx={{ fontSize: 20 }} />
        )}
      </IconButton>
    </Tooltip>
  )
}
