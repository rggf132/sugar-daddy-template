import React from 'react'
import { Box, Card, Container, Skeleton } from '@mui/material'
import { getSkeletonColors } from 'src/lib/skeleton-colors'

interface SSRProfilePageSkeletonProps {
  themeMode?: 'light' | 'dark'
  isMobile?: boolean
}

export const SSRProfilePageSkeleton: React.FC<SSRProfilePageSkeletonProps> = ({
  themeMode = 'light',
  isMobile = false,
}) => {
  const colors = getSkeletonColors(themeMode)

  return (
    <Container
      maxWidth='lg'
      sx={{
        minHeight: 'calc(100vh - 100px)',
        py: 4,
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Profile Header Section Skeleton */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          background:
            themeMode === 'light'
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, #4c63d2 0%, #6a3093 100%)',
          color: 'white',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.1)',
          }}
        />
        <Box sx={{ position: 'relative', p: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'center', md: 'flex-start' },
              gap: 3,
            }}
          >
            {/* Profile Avatar Skeleton */}
            <Box
              sx={{
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: -4,
                  left: -4,
                  right: -4,
                  bottom: -4,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  zIndex: 0,
                },
              }}
            >
              <Skeleton
                variant='circular'
                width={isMobile ? 120 : 140}
                height={isMobile ? 120 : 140}
                sx={{
                  border: '4px solid rgba(255, 255, 255, 0.3)',
                  zIndex: 1,
                  position: 'relative',
                  bgcolor: 'rgba(255, 255, 255, 0.3)',
                }}
              />
            </Box>

            {/* Profile Info Skeleton */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Skeleton
                variant='text'
                width='60%'
                height={40}
                sx={{
                  mb: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                }}
              />
              <Skeleton
                variant='text'
                width='45%'
                height={28}
                sx={{
                  mb: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.6)',
                }}
              />
              <Skeleton
                variant='rectangular'
                width={100}
                height={32}
                sx={{
                  borderRadius: 16,
                  bgcolor: 'rgba(255, 255, 255, 0.3)',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Card>

      {/* About Section Skeleton */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow:
            themeMode === 'light'
              ? '0 4px 20px rgba(0, 0, 0, 0.08)'
              : '0 4px 20px rgba(0, 0, 0, 0.3)',
          bgcolor: colors.background.card,
        }}
      >
        <Box sx={{ p: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Skeleton
              variant='rectangular'
              width={4}
              height={24}
              sx={{
                borderRadius: 2,
                bgcolor: colors.skeleton.primary,
                mr: 1,
              }}
            />
            <Skeleton
              variant='text'
              width={120}
              height={32}
              sx={{
                bgcolor: colors.skeleton.primary,
              }}
            />
          </Box>
          <Box>
            <Skeleton
              variant='text'
              width='100%'
              height={18}
              sx={{ mb: 1, bgcolor: colors.skeleton.secondary }}
            />
            <Skeleton
              variant='text'
              width='95%'
              height={18}
              sx={{ mb: 1, bgcolor: colors.skeleton.secondary }}
            />
            <Skeleton
              variant='text'
              width='90%'
              height={18}
              sx={{ mb: 1, bgcolor: colors.skeleton.secondary }}
            />
            <Skeleton
              variant='text'
              width='85%'
              height={18}
              sx={{ bgcolor: colors.skeleton.secondary }}
            />
          </Box>
        </Box>
      </Card>

      {/* Events Section Skeleton */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mb: 3,
          }}
        >
          <Skeleton
            variant='rectangular'
            width={6}
            height={32}
            sx={{
              borderRadius: 3,
              bgcolor: colors.skeleton.primary,
            }}
          />
          <Box
            sx={{
              color: colors.skeleton.primary,
              fontSize: '2rem',
              fontWeight: 700,
            }}
          >
            My Events
          </Box>
          <Skeleton
            variant='rectangular'
            width={6}
            height={32}
            sx={{
              borderRadius: 3,
              bgcolor: colors.skeleton.primary,
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            pb: 2,
          }}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 320,
                maxWidth: 380,
                borderRadius: 3,
                overflow: 'hidden',
                bgcolor: colors.background.card,
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {/* Event Image Skeleton */}
              <Skeleton
                variant='rectangular'
                height={200}
                sx={{
                  bgcolor: colors.skeleton.image,
                }}
              />

              {/* Event Content Skeleton */}
              <Box sx={{ p: 3 }}>
                <Skeleton
                  variant='text'
                  width='75%'
                  height={24}
                  sx={{
                    mb: 2,
                    bgcolor: colors.skeleton.primary,
                  }}
                />

                {/* EventOtherChips skeleton */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Skeleton
                      variant='rectangular'
                      width={60}
                      height={24}
                      sx={{
                        borderRadius: 12,
                        bgcolor: colors.skeleton.secondary,
                      }}
                    />
                    <Skeleton
                      variant='rectangular'
                      width={80}
                      height={24}
                      sx={{
                        borderRadius: 12,
                        bgcolor: colors.skeleton.secondary,
                      }}
                    />
                  </Box>
                </Box>

                {/* EventCategoryChips skeleton */}
                <Box sx={{ mt: 'auto' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Skeleton
                      variant='rectangular'
                      width={70}
                      height={24}
                      sx={{
                        borderRadius: 12,
                        bgcolor: colors.skeleton.tertiary,
                      }}
                    />
                    <Skeleton
                      variant='rectangular'
                      width={90}
                      height={24}
                      sx={{
                        borderRadius: 12,
                        bgcolor: colors.skeleton.tertiary,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  )
}
