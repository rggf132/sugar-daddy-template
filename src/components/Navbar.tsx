'use client'

import { Box, useTheme } from '@mui/material'
import React from 'react'

type NavbarProps = {
  children: React.ReactNode
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const theme = useTheme()

  return (
    <>
      <Box
        position='sticky'
        zIndex={10}
        top={0}
        sx={{
          background:
            theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.8)'
              : 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom:
            theme.palette.mode === 'light'
              ? '1px solid rgba(0, 0, 0, 0.06)'
              : '1px solid rgba(255, 255, 255, 0.06)',
          borderLeft:
            theme.palette.mode === 'light'
              ? '1px solid rgba(0, 0, 0, 0.06)'
              : '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <Box
          display='flex'
          alignItems='center'
          ml={3}
          height={72}
          sx={{
            background: 'transparent',
          }}
        >
          {children}
          <Box flexGrow={1} />
        </Box>
      </Box>
    </>
  )
}

export { Navbar }
