import React from 'react'
import { Box, Card, Container, Grid, Skeleton, Stack } from '@mui/material'
import { getSkeletonColors } from 'src/lib/skeleton-colors'

interface SSREventsPageSkeletonProps {
  themeMode?: 'light' | 'dark'
  isMobile?: boolean
}

export const SSREventsPageSkeleton: React.FC<SSREventsPageSkeletonProps> = ({
  themeMode = 'light',
  isMobile = false,
}) => {
  const colors = getSkeletonColors(themeMode)

  return (
    <Container
      maxWidth='xl'
      sx={{
        pt: 3,
        pb: 4,
        minHeight: 'calc(100vh - 100px)',
      }}
    >
      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} lg={12}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow:
                themeMode === 'light'
                  ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
              border:
                themeMode === 'light'
                  ? '1px solid rgba(0, 0, 0, 0.05)'
                  : '1px solid rgba(255, 255, 255, 0.05)',
              overflow: 'hidden',
              bgcolor: colors.background.card,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 3,
                pb: 2,
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Skeleton
                  variant='text'
                  width='70%'
                  height={48}
                  sx={{
                    bgcolor: colors.skeleton.primary,
                  }}
                />
                <Skeleton
                  variant='rectangular'
                  width={100}
                  height={36}
                  sx={{
                    borderRadius: 2,
                    bgcolor: colors.skeleton.secondary,
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ p: 0 }}>
              {/* Event Image */}
              <Skeleton
                variant='rectangular'
                height={400}
                sx={{
                  bgcolor: colors.skeleton.image,
                }}
              />

              {/* Event Details */}
              <Box sx={{ p: 3 }}>
                {/* Event Info Cards */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ mb: 3 }}
                >
                  {/* Date & Time Card */}
                  <Card
                    sx={{
                      flex: 1,
                      borderRadius: 2,
                      backgroundColor:
                        themeMode === 'light'
                          ? 'rgba(99, 102, 241, 0.05)'
                          : 'rgba(99, 102, 241, 0.1)',
                      border: `1px solid ${
                        themeMode === 'light'
                          ? 'rgba(99, 102, 241, 0.1)'
                          : 'rgba(99, 102, 241, 0.2)'
                      }`,
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Skeleton
                          variant='circular'
                          width={18}
                          height={18}
                          sx={{ bgcolor: colors.skeleton.primary }}
                        />
                        <Skeleton
                          variant='text'
                          width={80}
                          height={20}
                          sx={{ bgcolor: colors.skeleton.primary }}
                        />
                      </Box>
                      <Skeleton
                        variant='text'
                        width='90%'
                        height={16}
                        sx={{ bgcolor: colors.skeleton.secondary }}
                      />
                    </Box>
                  </Card>

                  {/* Location Card */}
                  <Card
                    sx={{
                      flex: 1,
                      borderRadius: 2,
                      backgroundColor:
                        themeMode === 'light'
                          ? 'rgba(236, 72, 153, 0.05)'
                          : 'rgba(236, 72, 153, 0.1)',
                      border: `1px solid ${
                        themeMode === 'light'
                          ? 'rgba(236, 72, 153, 0.1)'
                          : 'rgba(236, 72, 153, 0.2)'
                      }`,
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Skeleton
                          variant='circular'
                          width={18}
                          height={18}
                          sx={{ bgcolor: colors.skeleton.secondary }}
                        />
                        <Skeleton
                          variant='text'
                          width={70}
                          height={20}
                          sx={{ bgcolor: colors.skeleton.secondary }}
                        />
                      </Box>
                      <Skeleton
                        variant='text'
                        width='85%'
                        height={16}
                        sx={{ bgcolor: colors.skeleton.secondary }}
                      />
                    </Box>
                  </Card>
                </Stack>

                {/* Event Description */}
                <Box sx={{ mb: 3 }}>
                  <Skeleton
                    variant='text'
                    width={150}
                    height={28}
                    sx={{
                      mb: 2,
                      bgcolor: colors.skeleton.primary,
                    }}
                  />
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

                {/* Event Categories and Tags */}
                <Box sx={{ mb: 3 }}>
                  {/* EventOtherChips skeleton */}
                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}
                  >
                    <Skeleton
                      variant='rectangular'
                      width={80}
                      height={24}
                      sx={{
                        borderRadius: 12,
                        bgcolor: colors.skeleton.secondary,
                      }}
                    />
                    <Skeleton
                      variant='rectangular'
                      width={100}
                      height={24}
                      sx={{
                        borderRadius: 12,
                        bgcolor: colors.skeleton.secondary,
                      }}
                    />
                    <Skeleton
                      variant='rectangular'
                      width={90}
                      height={24}
                      sx={{
                        borderRadius: 12,
                        bgcolor: colors.skeleton.secondary,
                      }}
                    />
                  </Box>

                  {/* EventCategoryChips skeleton */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
                      width={85}
                      height={24}
                      sx={{
                        borderRadius: 12,
                        bgcolor: colors.skeleton.tertiary,
                      }}
                    />
                    <Skeleton
                      variant='rectangular'
                      width={95}
                      height={24}
                      sx={{
                        borderRadius: 12,
                        bgcolor: colors.skeleton.tertiary,
                      }}
                    />
                  </Box>
                </Box>

                {/* Timestamps */}
                <Box
                  sx={{
                    pt: 2,
                    borderTop: `1px solid ${colors.border}`,
                  }}
                >
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Skeleton
                      variant='text'
                      width={120}
                      height={14}
                      sx={{ bgcolor: colors.skeleton.tertiary }}
                    />
                    <Skeleton
                      variant='text'
                      width={130}
                      height={14}
                      sx={{ bgcolor: colors.skeleton.tertiary }}
                    />
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Box
          sx={{
            position: 'fixed',
            top: 100,
            right: -320, // Completely hidden by default
            width: 320,
            zIndex: 1000,
            display: { xs: 'none', md: 'block' }, // Hide on mobile
            transition: 'right 0.3s ease-in-out', // Match the real component transition
          }}
        >
          <Card
            sx={{
              borderRadius: 3,
              boxShadow:
                themeMode === 'light'
                  ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)'
                  : '0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)',
              border:
                themeMode === 'light'
                  ? '1px solid rgba(0, 0, 0, 0.05)'
                  : '1px solid rgba(255, 255, 255, 0.05)',
              height: 'fit-content',
              backdropFilter: 'blur(8px)',
              backgroundColor:
                themeMode === 'light'
                  ? 'rgba(255, 255, 255, 0.9)'
                  : 'rgba(30, 41, 59, 0.9)',
              minHeight: 80,
            }}
          >
            <Box sx={{ p: 2 }}>
              {/* Creator Header */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  minHeight: 64,
                  width: '100%',
                }}
              >
                <Skeleton
                  variant='circular'
                  width={40}
                  height={40}
                  sx={{
                    border: `2px solid ${colors.skeleton.primary}`,
                    flexShrink: 0,
                  }}
                />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Skeleton
                    variant='text'
                    width='60%'
                    height={20}
                    sx={{
                      mb: 0.5,
                      bgcolor: colors.skeleton.primary,
                    }}
                  />
                  <Skeleton
                    variant='text'
                    width='40%'
                    height={14}
                    sx={{
                      bgcolor: colors.skeleton.secondary,
                    }}
                  />
                </Box>
                <Skeleton
                  variant='circular'
                  width={24}
                  height={24}
                  sx={{
                    bgcolor: colors.skeleton.secondary,
                  }}
                />
              </Box>
            </Box>
          </Card>
        </Box>
      </Grid>
    </Container>
  )
}
