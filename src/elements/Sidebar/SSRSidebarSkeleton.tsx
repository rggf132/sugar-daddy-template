import React from 'react'
import { Box, Skeleton } from '@mui/material'
import { getSkeletonColors } from 'src/lib/skeleton-colors'

interface SSRSidebarSkeletonProps {
  themeMode?: 'light' | 'dark'
  isMobile?: boolean
}

export const SSRSidebarSkeleton: React.FC<SSRSidebarSkeletonProps> = ({
  themeMode = 'light',
  isMobile = false,
}) => {
  const colors = getSkeletonColors(themeMode)

  return (
    <Box
      display='flex'
      flexDirection='column'
      bgcolor={colors.background.sidebar}
      width={isMobile ? '100%' : 280}
      minWidth={isMobile ? '100%' : 280}
      height='100vh'
      overflow='hidden'
    >
      {/* Header skeleton */}
      <Box px={isMobile ? 2 : 3} pt={isMobile ? 2 : 3} pb={2}>
        <Skeleton
          variant='text'
          width='70%'
          height={isMobile ? 20 : 24}
          sx={{
            borderRadius: 1,
            bgcolor: colors.skeleton.text,
            mb: 1,
          }}
        />
        <Skeleton
          variant='text'
          width='50%'
          height={isMobile ? 14 : 16}
          sx={{
            borderRadius: 1,
            bgcolor: colors.skeleton.secondary,
          }}
        />
      </Box>

      {/* Divider skeleton */}
      <Box px={isMobile ? 1 : 2} mb={2}>
        <Skeleton
          variant='rectangular'
          height={1}
          sx={{
            bgcolor: colors.border.divider,
          }}
        />
      </Box>

      {/* Scrollable content area skeleton */}
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
        {/* Filters label skeleton */}
        <Skeleton
          variant='text'
          width='40%'
          height={isMobile ? 16 : 18}
          sx={{
            mb: 2,
            bgcolor: colors.skeleton.text,
          }}
        />

        {/* Filter skeletons */}
        <Box>
          {/* Category filter skeleton */}
          <Box sx={{ mt: 1 }}>
            <Skeleton
              variant='text'
              width='60%'
              height={isMobile ? 14 : 16}
              sx={{
                mb: 1,
                bgcolor: colors.skeleton.secondary,
              }}
            />
            <Skeleton
              variant='rectangular'
              height={isMobile ? 40 : 48}
              sx={{
                borderRadius: 1,
                bgcolor: colors.skeleton.primary,
              }}
            />
          </Box>

          {/* Sub Category filter skeleton */}
          <Box sx={{ mt: 1 }}>
            <Skeleton
              variant='text'
              width='70%'
              height={isMobile ? 14 : 16}
              sx={{
                mb: 1,
                bgcolor: colors.skeleton.secondary,
              }}
            />
            <Skeleton
              variant='rectangular'
              height={isMobile ? 40 : 48}
              sx={{
                borderRadius: 1,
                bgcolor: colors.skeleton.primary,
              }}
            />
          </Box>

          {/* Entry Type filter skeleton */}
          <Box sx={{ mt: 1 }}>
            <Skeleton
              variant='text'
              width='50%'
              height={isMobile ? 14 : 16}
              sx={{
                mb: 1,
                bgcolor: colors.skeleton.secondary,
              }}
            />
            <Skeleton
              variant='rectangular'
              height={isMobile ? 40 : 48}
              sx={{
                borderRadius: 1,
                bgcolor: colors.skeleton.primary,
              }}
            />
          </Box>

          {/* Country filter skeleton */}
          <Box sx={{ mt: 1 }}>
            <Skeleton
              variant='text'
              width='45%'
              height={isMobile ? 14 : 16}
              sx={{
                mb: 1,
                bgcolor: colors.skeleton.secondary,
              }}
            />
            <Skeleton
              variant='rectangular'
              height={isMobile ? 40 : 48}
              sx={{
                borderRadius: 1,
                bgcolor: colors.skeleton.primary,
              }}
            />
          </Box>

          {/* City filter skeleton */}
          <Box sx={{ mt: 1 }}>
            <Skeleton
              variant='text'
              width='30%'
              height={isMobile ? 14 : 16}
              sx={{
                mb: 1,
                bgcolor: colors.skeleton.secondary,
              }}
            />
            <Skeleton
              variant='rectangular'
              height={isMobile ? 40 : 48}
              sx={{
                borderRadius: 1,
                bgcolor: colors.skeleton.primary,
              }}
            />
          </Box>

          {/* Start Time filter skeleton */}
          <Box sx={{ mt: 1 }}>
            <Skeleton
              variant='text'
              width='55%'
              height={isMobile ? 14 : 16}
              sx={{
                mb: 1,
                bgcolor: colors.skeleton.secondary,
              }}
            />
            <Skeleton
              variant='rectangular'
              height={isMobile ? 40 : 48}
              sx={{
                borderRadius: 1,
                bgcolor: colors.skeleton.primary,
              }}
            />
          </Box>

          {/* End Time filter skeleton */}
          <Box sx={{ mt: 1 }}>
            <Skeleton
              variant='text'
              width='40%'
              height={isMobile ? 14 : 16}
              sx={{
                mb: 1,
                bgcolor: colors.skeleton.secondary,
              }}
            />
            <Skeleton
              variant='rectangular'
              height={isMobile ? 40 : 48}
              sx={{
                borderRadius: 1,
                bgcolor: colors.skeleton.primary,
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Mobile close button skeleton */}
      {isMobile && (
        <Box
          sx={{
            bgcolor: colors.background.sidebar,
            borderTop: `1px solid ${colors.border.divider}`,
            p: 2,
          }}
        >
          <Skeleton
            variant='rectangular'
            height={48}
            sx={{
              borderRadius: 1,
              bgcolor: colors.skeleton.primary,
            }}
          />
        </Box>
      )}
    </Box>
  )
}
