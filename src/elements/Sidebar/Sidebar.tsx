'use client'

import React from 'react'
import { SidebarLink } from './SidebarLink'
import {
  Box,
  Typography,
  Divider,
  useTheme,
  IconButton,
  Tooltip,
  useMediaQuery,
  Button,
} from '@mui/material'
import { SelectFilter } from '../filters/SelectFilter'
import { CountryCityFilter } from '../filters/CountryCityFilter'
import {
  useGetAllFilters,
  Filter,
  FilterData,
} from 'src/core/react-query/features/filters'
import { useSearchParams, useRouter } from 'next/navigation'
import { SupervisorAccount, ChevronLeft } from '@mui/icons-material'
import { PageUrls } from 'src/core/page-urls'
import { useSession } from 'next-auth/react'
import { DateTimeFilter } from '../filters/DateTimeFIlter'
import { SSRSidebarSkeleton } from './SSRSidebarSkeleton'
import { domainConfig } from 'src/domain.config'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  serverThemeMode?: 'light' | 'dark'
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggle,
  serverThemeMode = 'light',
}) => {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { data: filters, isLoading } = useGetAllFilters()

  const isAdmin =
    session?.user.email === 'castrew132@gmail.com' ||
    session?.user.email === 'rggf132@gmail.com'

  // Show skeleton while loading or if no filters
  if (isLoading || !filters) {
    return (
      <SSRSidebarSkeleton themeMode={serverThemeMode} isMobile={isMobile} />
    )
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      sx={{
        bgcolor: theme.palette.background.paper,
        borderRight: !isMobile
          ? theme.palette.mode === 'light'
            ? '1px solid rgba(0, 0, 0, 0.06)'
            : '1px solid rgba(255, 255, 255, 0.06)'
          : 'none',
        width: isMobile ? '100%' : 280,
        minWidth: isMobile ? '100%' : 280,
        position: 'relative',
        transform: collapsed ? 'translateX(-100%)' : 'translateX(0)',
        transition: 'transform 0.3s ease-in-out',
        height: '100vh',
        overflow: 'hidden',
      }}
      justifyContent='space-between'
    >
      {/* Toggle button - only show on desktop */}
      {!isMobile && (
        <Tooltip title='Hide sidebar' placement='right'>
          <IconButton
            onClick={onToggle}
            sx={{
              position: 'absolute',
              top: 16,
              right: -12,
              zIndex: 10,
              backgroundColor: 'background.paper',
              border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)'}`,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: 'background.paper',
                transform: 'scale(1.05)',
              },
              transition: 'transform 0.2s ease-in-out',
            }}
            size='small'
          >
            <ChevronLeft fontSize='small' />
          </IconButton>
        </Tooltip>
      )}

      {/* Header */}
      <Box px={isMobile ? 2 : 3} pt={isMobile ? 2 : 3} pb={2}>
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          {domainConfig.app.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {domainConfig.app.description}
        </Typography>
      </Box>

      <Divider sx={{ mx: isMobile ? 1 : 2, mb: 2 }} />

      {/* Scrollable content area */}
      <Box
        display='flex'
        flexDirection='column'
        flex={1}
        sx={{
          overflow: 'auto',
          px: isMobile ? 2 : 3,
          pb: isMobile ? 2 : 3,
        }}
      >
        <Typography
          variant='subtitle2'
          color='text.secondary'
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Filters
        </Typography>
        <Box>
          {filters &&
            filters.length > 0 &&
            (filters as Filter[]).map((filter: Filter) => {
              const condition = filter.type === 'subCategory'
              const correctOptions = condition
                ? filter.data.filter(
                    (subCategory: FilterData) =>
                      subCategory.category_id == searchParams.get('category'),
                  )
                : filter.data

              return (
                <SelectFilter
                  key={filter.id}
                  disabled={
                    !searchParams.get('category') &&
                    filter.type === 'subCategory'
                  }
                  label={filter.name}
                  type={filter.type}
                  options={correctOptions || []}
                  sx={{ mt: 1 }}
                />
              )
            })}
          <CountryCityFilter sx={{ mt: 1 }} />
          <DateTimeFilter label='Start Time' type='startTime' sx={{ mt: 1 }} />
          <DateTimeFilter label='End Time' type='endTime' />

          {/* Mobile close button - positioned higher */}
          {isMobile && (
            <Box
              sx={{
                bgcolor: 'background.paper',
                borderTop: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)'}`,
                p: 2,
                mt: 'auto',
              }}
            >
              <Button
                variant='contained'
                fullWidth
                onClick={onToggle}
                sx={{
                  background:
                    'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                  '&:hover': {
                    background:
                      'linear-gradient(135deg, #4F46E5 0%, #DB2777 100%)',
                  },
                }}
              >
                Close Filters
              </Button>
            </Box>
          )}

          {session && isAdmin && (
            <>
              <Divider sx={{ mx: isMobile ? 1 : 2, mb: 2, mt: 2 }} />
              <Box p={isMobile ? 1 : 2}>
                <SidebarLink
                  title='Admin View'
                  onClick={() => router.push(PageUrls.adminHome())}
                  icon={<SupervisorAccount />}
                />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export { Sidebar }
