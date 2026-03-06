import React from 'react'
import { Box, Card, CardContent, Skeleton } from '@mui/material'
import { getSkeletonColors } from 'src/lib/skeleton-colors'

interface SSREventsListSkeletonProps {
  themeMode?: 'light' | 'dark'
  isMobile?: boolean
}

export const SSREventsListSkeleton: React.FC<SSREventsListSkeletonProps> = ({
  themeMode = 'light',
  isMobile = false,
}) => {
  const colors = getSkeletonColors(themeMode)

  return (
    <Box>
      <Box
        sx={{
          display: isMobile ? 'flex' : 'grid',
          flexDirection: isMobile ? 'column' : 'row',
          gridTemplateColumns: isMobile
            ? '1fr'
            : {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
          gap: 2,
          mb: 3,
        }}
      >
        {Array.from({ length: isMobile ? 6 : 8 }).map((_, index) => (
          <Card
            key={index}
            sx={{
              height: 'fit-content',
              bgcolor: colors.background.card,
            }}
          >
            {/* Image skeleton */}
            <Skeleton
              variant='rectangular'
              height={isMobile ? 160 : 200}
              sx={{
                borderRadius: '4px 4px 0 0',
                bgcolor: colors.skeleton.image,
              }}
            />

            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
              {/* Title skeleton */}
              <Box sx={{ mb: 2 }}>
                <Skeleton
                  variant='text'
                  width='80%'
                  height={isMobile ? 18 : 20}
                  sx={{ bgcolor: colors.skeleton.text }}
                />
              </Box>

              {/* Avatar and time skeleton */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Skeleton
                  variant='circular'
                  width={24}
                  height={24}
                  sx={{ mr: 1.5, bgcolor: colors.skeleton.secondary }}
                />
                <Skeleton
                  variant='text'
                  width='60%'
                  height={isMobile ? 14 : 16}
                  sx={{ bgcolor: colors.skeleton.secondary }}
                />
              </Box>

              {/* Description skeleton */}
              <Box sx={{ mb: 2 }}>
                <Skeleton
                  variant='text'
                  width='100%'
                  height={isMobile ? 14 : 16}
                  sx={{ mb: 0.5, bgcolor: colors.skeleton.secondary }}
                />
                <Skeleton
                  variant='text'
                  width='70%'
                  height={isMobile ? 14 : 16}
                  sx={{ bgcolor: colors.skeleton.secondary }}
                />
              </Box>

              {/* Category chips skeleton */}
              <Box
                sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.5 }}
              >
                <Skeleton
                  variant='rectangular'
                  width={80}
                  height={isMobile ? 20 : 24}
                  sx={{ borderRadius: 1, bgcolor: colors.skeleton.primary }}
                />
                <Skeleton
                  variant='rectangular'
                  width={60}
                  height={isMobile ? 20 : 24}
                  sx={{ borderRadius: 1, bgcolor: colors.skeleton.primary }}
                />
                <Skeleton
                  variant='rectangular'
                  width={70}
                  height={isMobile ? 20 : 24}
                  sx={{ borderRadius: 1, bgcolor: colors.skeleton.primary }}
                />
              </Box>

              {/* Other chips skeleton */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                <Skeleton
                  variant='rectangular'
                  width={50}
                  height={isMobile ? 18 : 20}
                  sx={{ borderRadius: 1, bgcolor: colors.skeleton.tertiary }}
                />
                <Skeleton
                  variant='rectangular'
                  width={65}
                  height={isMobile ? 18 : 20}
                  sx={{ borderRadius: 1, bgcolor: colors.skeleton.tertiary }}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
