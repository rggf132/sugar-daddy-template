'use client'

import React from 'react'
import { IconButton, Tooltip, useTheme } from '@mui/material'
import { FilterList } from '@mui/icons-material'
import { useSidebar } from 'src/contexts/SidebarContext'

export const FloatingFiltersButton: React.FC = () => {
  const theme = useTheme()
  const { sidebarCollapsed, updateSidebarCollapsed } = useSidebar()

  const handleShowSidebar = () => {
    updateSidebarCollapsed(false)
  }

  return (
    <Tooltip title='Show filters' placement='right'>
      <IconButton
        onClick={handleShowSidebar}
        sx={{
          position: 'fixed',
          top: 100, // Below the navbar
          left: 24,
          zIndex: 100,
          width: 56,
          height: 56,
          backgroundColor: 'background.paper',
          border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)'}`,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            backgroundColor: 'background.paper',
            transform: 'scale(1.05)',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
          },
          transition: 'all 0.3s ease-in-out',
          opacity: sidebarCollapsed ? 1 : 0,
          transform: sidebarCollapsed ? 'translateX(0)' : 'translateX(-20px)',
          pointerEvents: sidebarCollapsed ? 'auto' : 'none',
        }}
      >
        <FilterList sx={{ fontSize: 24 }} />
      </IconButton>
    </Tooltip>
  )
}
