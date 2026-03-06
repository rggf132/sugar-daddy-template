import { Box } from '@mui/material'
import { SSREventsListSkeleton } from 'src/components/SSREventsListSkeleton'
import { getSkeletonColors } from 'src/lib/skeleton-colors'

interface EventsHomePageSkeletonProps {
  serverThemeMode?: 'light' | 'dark'
}

export const EventsHomePageSkeleton: React.FC<EventsHomePageSkeletonProps> = ({
  serverThemeMode = 'light',
}) => {
  const colors = getSkeletonColors(serverThemeMode)

  return (
    <Box>
      <Box display='flex' alignItems='center' mb={2}>
        <Box flex={1}>
          <Box
            sx={{
              height: 48,
              bgcolor: colors.background.searchBar,
              borderRadius: 1,
              width: '100%',
            }}
          />
        </Box>
      </Box>
      <Box mt={2}>
        <SSREventsListSkeleton themeMode={serverThemeMode} isMobile={false} />
      </Box>
    </Box>
  )
}
