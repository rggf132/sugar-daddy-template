'use client'

import {
  Box,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { useSearchParams, useRouter } from 'next/navigation'
import SearchTermFilter from 'src/elements/filters/SearchTermFilter'
import { useModal } from 'src/components/GlobalModal'
import { CreateUpdateEventModal } from './modals/CreateUpdateEventModal'
import { Add, FilterList } from '@mui/icons-material'
import { useSession } from 'next-auth/react'
import { ScrollToTopButton } from 'src/components/ScrollToTopButton'
import { InfiniteEventsList } from 'src/components/InfiniteEventsList'
import { Event } from 'src/core/react-query/features/events/types'
import { PageUrls } from 'src/core/page-urls'
import { useSidebar } from 'src/contexts/SidebarContext'

interface ClientEventsHomePageProps {
  isAdmin?: boolean
}

export const ClientEventsHomePage: React.FC<ClientEventsHomePageProps> = ({
  isAdmin,
}) => {
  const theme = useTheme()
  const router = useRouter()
  const { showModal } = useModal()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const { sidebarCollapsed, updateSidebarCollapsed } = useSidebar()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const filterParams = {
    ...(searchParams?.get('searchTerm')
      ? { term: searchParams.get('searchTerm') as string }
      : {}),
    ...(searchParams?.get('category')
      ? { categoryId: searchParams.get('category') as string }
      : {}),
    ...(searchParams?.get('subCategory')
      ? {
          subCategoryIds:
            searchParams.get('subCategory')?.split(',').filter(Boolean) || [],
        }
      : {}),
    ...(searchParams?.get('entryType')
      ? { entryTypeId: searchParams.get('entryType') as string }
      : {}),
    ...(searchParams?.get('countryId')
      ? { countryId: searchParams.get('countryId') as string }
      : {}),
    ...(searchParams?.get('cityId')
      ? { cityId: searchParams.get('cityId') as string }
      : {}),
    ...(searchParams?.get('startTime')
      ? {
          start: searchParams.get('startTime') as string,
        }
      : {}),
    ...(searchParams?.get('endTime')
      ? {
          end: searchParams.get('endTime') as string,
        }
      : {}),
  }

  const handleEventClick = (event: Event) => {
    if (isAdmin) {
      router.push(PageUrls.adminEvent({ eventId: event.id }))
    } else {
      router.push(PageUrls.event({ eventId: event.id }))
    }
  }

  return (
    <Box>
      <Box display='flex' alignItems='center' mb={isMobile ? 1 : 2}>
        <Tooltip title='Show filters'>
          <IconButton
            onClick={() => updateSidebarCollapsed(false)}
            sx={{
              backgroundColor: 'background.paper',
              border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)'}`,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: 'background.paper',
                transform: 'scale(1.05)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
              transition: 'all 0.3s ease-in-out',
              opacity: sidebarCollapsed ? 1 : 0,
              transform: sidebarCollapsed
                ? 'translateX(0)'
                : 'translateX(-20px)',
              pointerEvents: sidebarCollapsed ? 'auto' : 'none',
              width: sidebarCollapsed ? (isMobile ? 40 : 48) : 0,
              minWidth: sidebarCollapsed ? (isMobile ? 40 : 48) : 0,
              mr: sidebarCollapsed ? (isMobile ? 1 : 2) : 0,
              overflow: 'hidden',
            }}
          >
            <FilterList sx={{ fontSize: isMobile ? 20 : 24 }} />
          </IconButton>
        </Tooltip>
        <Box flex={1}>
          <SearchTermFilter
            type='searchTerm'
            sx={{ ml: sidebarCollapsed ? 0 : isMobile ? -1 : -2 }}
          />
        </Box>
      </Box>
      <Box mt={2}>
        <InfiniteEventsList
          filters={filterParams}
          onEventClick={handleEventClick}
          autoLoadMore={true}
        />
      </Box>
      {session && (
        <Tooltip title='Create Event'>
          <IconButton
            sx={{
              position: 'fixed',
              width: isMobile ? '60px' : '70px',
              height: isMobile ? '60px' : '70px',
              bottom: isMobile ? 16 : 24,
              right: isMobile ? 16 : 24,
              zIndex: 100,
              background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
              boxShadow:
                '0 10px 15px -3px rgba(99, 102, 241, 0.3), 0 4px 6px -2px rgba(99, 102, 241, 0.2)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4F46E5 0%, #DB2777 100%)',
                boxShadow:
                  '0 20px 25px -5px rgba(99, 102, 241, 0.4), 0 10px 10px -5px rgba(99, 102, 241, 0.3)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onClick={() =>
              showModal(<CreateUpdateEventModal modalTitle='Create Event' />, {
                onClose: () => {},
              })
            }
          >
            <Add
              sx={{
                width: isMobile ? '28px' : '32px',
                height: isMobile ? '28px' : '32px',
              }}
              style={{ color: '#FFFFFF' }}
            />
          </IconButton>
        </Tooltip>
      )}
      <ScrollToTopButton
        pageElement={
          typeof window !== 'undefined'
            ? document.getElementById('scroll-container')
            : null
        }
      />
    </Box>
  )
}
