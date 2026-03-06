'use client'

import {
  Avatar,
  Box,
  Card,
  Chip,
  Container,
  Typography,
  useTheme,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { BackdropLoader } from 'src/components/BackdropLoader'
import { Flex } from 'src/components/Flex'
import { useGetAllEvents } from 'src/core/react-query/features/events/hooks/useGetAllEvents'
import { EventCategoryChips } from 'src/modules/events/EventCategoryChips'
import { EventOtherChips } from 'src/modules/events/EventOtherChips'
import { PageUrls } from 'src/core/page-urls'

interface ProfilePageClientProps {
  serverThemeMode: 'light' | 'dark'
}

export const ProfilePageClient: React.FC<ProfilePageClientProps> = ({
  serverThemeMode,
}) => {
  const theme = useTheme()
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user

  const { data: events, isLoading } = useGetAllEvents(
    { userId: session?.user.id },
    { enabled: !!session?.user.id },
  )

  if (!user) {
    return <BackdropLoader open />
  }

  return (
    <Container
      maxWidth='lg'
      sx={{
        minHeight: 'calc(100vh - 100px)',
        py: 4,
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Profile Header Section */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          background:
            theme.palette.mode === 'light'
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
          <Flex
            flexDirection={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            gap={3}
          >
            {/* Profile Avatar */}
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
              <Avatar
                src={user.image}
                sx={{
                  width: { xs: 120, md: 140 },
                  height: { xs: 120, md: 140 },
                  border: '4px solid rgba(255, 255, 255, 0.3)',
                  zIndex: 1,
                  position: 'relative',
                }}
              />
            </Box>

            {/* Profile Info */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant='h3'
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                }}
              >
                {user.name}
              </Typography>
              <Typography
                variant='h6'
                sx={{
                  opacity: 0.9,
                  mb: 2,
                  fontWeight: 400,
                }}
              >
                {user.email}
              </Typography>
              <Chip
                label='Event Creator'
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              />
            </Box>
          </Flex>
        </Box>
      </Card>

      {/* About Section */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow:
            theme.palette.mode === 'light'
              ? '0 4px 20px rgba(0, 0, 0, 0.08)'
              : '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Box sx={{ p: 4 }}>
          <Typography
            variant='h5'
            sx={{
              fontWeight: 600,
              mb: 3,
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box
              component='span'
              sx={{
                width: 4,
                height: 24,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                mr: 1,
              }}
            />
            About Me
          </Typography>
          <Typography
            variant='body1'
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              fontSize: '1.1rem',
            }}
          >
            Passionate event creator and community builder. I love bringing
            people together through meaningful experiences and creating
            memorable moments. With a focus on innovative event design and
            seamless execution, I strive to make every gathering special and
            impactful.
          </Typography>
        </Box>
      </Card>

      {/* Events Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant='h4'
          sx={{
            fontWeight: 700,
            mb: 3,
            color: 'text.primary',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Box
            component='span'
            sx={{
              width: 6,
              height: 32,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          />
          My Events
          <Box
            component='span'
            sx={{
              width: 6,
              height: 32,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          />
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            pb: 2,
            '&::-webkit-scrollbar': {
              height: 8,
            },
            '&::-webkit-scrollbar-track': {
              background:
                theme.palette.mode === 'light' ? '#f1f1f1' : '#2d3748',
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 4,
            },
          }}
        >
          {events?.events?.length ? (
            events.events?.map((event, index) => (
              <Card
                key={event.id}
                sx={{
                  minWidth: 320,
                  maxWidth: 380,
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow:
                      theme.palette.mode === 'light'
                        ? '0 20px 40px rgba(0, 0, 0, 0.15)'
                        : '0 20px 40px rgba(0, 0, 0, 0.4)',
                  },
                }}
                onClick={() => {
                  router.push(PageUrls.event({ eventId: event.id }))
                }}
              >
                {/* Event Image */}
                <Box
                  sx={{
                    height: 200,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  {event?.imageUrl ? (
                    <img
                      src={event?.imageUrl}
                      alt={event.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor:
                          theme.palette.mode === 'light'
                            ? '#f8fafc'
                            : '#2d3748',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src='/placeholder-image.png'
                        alt='placeholder'
                        style={{
                          width: 60,
                          height: 40,
                          opacity: 0.6,
                        }}
                      />
                    </Box>
                  )}
                </Box>

                {/* Event Content */}
                <Box sx={{ p: 3 }}>
                  <Typography
                    variant='h6'
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: 'text.primary',
                      lineHeight: 1.3,
                    }}
                  >
                    {event.title}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <EventOtherChips event={event} />
                  </Box>

                  <Box sx={{ mt: 'auto' }}>
                    <EventCategoryChips event={event} />
                  </Box>
                </Box>
              </Card>
            ))
          ) : (
            <Card
              sx={{
                minWidth: 320,
                maxWidth: 380,
                borderRadius: 3,
                p: 4,
                textAlign: 'center',
                background:
                  theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
                    : 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
              }}
            >
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: 'text.primary',
                }}
              >
                No Events Yet
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  color: 'text.secondary',
                  mb: 3,
                }}
              >
                Start creating amazing events to build your community!
              </Typography>
              <Chip
                label='Create Your First Event'
                sx={{
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer',
                  '&:hover': {
                    background:
                      'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                  },
                }}
                onClick={() => {
                  // You can add navigation to create event page here
                }}
              />
            </Card>
          )}
        </Box>
      </Box>
    </Container>
  )
}
