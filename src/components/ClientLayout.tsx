'use client'

import React, { createContext, useContext, useMemo } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Navbar } from './Navbar'
import { NavigationAwareBreadcrumbs } from 'src/elements/NavigationAwareBreadcrumbs'
import { Profile } from './Profile'
import { ThemeToggleWrapper } from './ThemeToggleWrapper'
import { Sidebar } from 'src/elements/Sidebar'
import { useSidebar } from 'src/contexts/SidebarContext'
import { domainConfig } from 'src/domain.config'

type LayoutContext = {
  isMobile: boolean
  showSidebar: boolean
}

const LayoutCtx = createContext<LayoutContext>({
  isMobile: false,
  showSidebar: true,
})

const TopBar: React.FC = () => {
  const { isMobile, showSidebar } = useContext(LayoutCtx)
  const { sidebarCollapsed } = useSidebar()
  const showAppName = showSidebar && sidebarCollapsed

  return (
    <Navbar>
      <Box
        display='flex'
        justifyContent='space-between'
        width='100%'
        alignItems='center'
        sx={{
          px: isMobile ? 1 : 2,
        }}
      >
        <Box display='flex' alignItems='center' gap={isMobile ? 1 : 2}>
          {showAppName && (
            <Typography
              variant={isMobile ? 'subtitle1' : 'h6'}
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {domainConfig.app.name}
            </Typography>
          )}
          {!isMobile && <NavigationAwareBreadcrumbs />}
        </Box>
        <Box display='flex' alignItems='center' gap={isMobile ? 0.5 : 1}>
          <ThemeToggleWrapper />
          <Profile />
        </Box>
      </Box>
    </Navbar>
  )
}

interface ClientLayoutProps {
  children: React.ReactNode
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathName = usePathname()
  const params = useParams<Record<string, string>>()
  const { sidebarCollapsed, toggleSidebar, serverThemeMode } = useSidebar()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const detailParam = domainConfig.listing.detailParam
  const showSidebar =
    !(params && params[detailParam]) && pathName !== '/profile'

  const layoutCtx = useMemo(
    () => ({ isMobile, showSidebar }),
    [isMobile, showSidebar],
  )

  return (
    <LayoutCtx.Provider value={layoutCtx}>
      <Box
        minHeight='100vh'
        height='100vh'
        width='100%'
        sx={{
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)'
              : 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        }}
        display='flex'
      >
        {(!isMobile || (isMobile && showSidebar && !sidebarCollapsed)) && (
          <Box
            sx={{
              width: isMobile
                ? '100%'
                : showSidebar && !sidebarCollapsed
                  ? 280
                  : 0,
              minWidth: isMobile
                ? '100%'
                : showSidebar && !sidebarCollapsed
                  ? 280
                  : 0,
              overflow: 'hidden',
              transition: 'width 0.3s ease-in-out, min-width 0.3s ease-in-out',
              bgcolor: 'background.paper',
              position: isMobile ? 'fixed' : 'relative',
              top: isMobile ? 0 : 'auto',
              left: isMobile ? 0 : 'auto',
              right: isMobile ? 0 : 'auto',
              bottom: isMobile ? 0 : 'auto',
              zIndex: isMobile ? 9999 : 'auto',
              height: isMobile ? '100vh' : 'auto',
            }}
          >
            {showSidebar && (
              <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={toggleSidebar}
                serverThemeMode={serverThemeMode}
              />
            )}
          </Box>
        )}
        <Box
          id='scroll-container'
          flexDirection='column'
          flex={1}
          overflow='auto'
          sx={{
            transition: 'margin-left 0.3s ease-in-out',
            width: isMobile && showSidebar && !sidebarCollapsed ? 0 : 'auto',
            overflow:
              isMobile && showSidebar && !sidebarCollapsed ? 'hidden' : 'auto',
          }}
        >
          <TopBar />
          <Box flexDirection='column' flex={1} p={isMobile ? 1 : 2}>
            {children}
          </Box>
        </Box>
      </Box>
    </LayoutCtx.Provider>
  )
}
