'use client'

import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { Flex } from 'src/components/Flex'
import { UserAvatar } from 'src/components/UserAvatar'

interface CreatorSidebarProps {
  creator: {
    name: string
    image?: string
    email: string
  }
}

export const CreatorSidebar: React.FC<CreatorSidebarProps> = ({ creator }) => {
  const theme = useTheme()
  const [expanded, setExpanded] = useState(false)

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 100,
        right: expanded ? 24 : -224,
        width: 320,
        zIndex: 1000,
        transition: 'right 0.3s ease-in-out',
      }}
    >
      <Tooltip
        title={!expanded ? 'Click to see creator info' : ''}
        placement='left'
        arrow
        disableHoverListener={expanded}
        disableFocusListener={expanded}
        disableTouchListener={expanded}
      >
        <Card
          sx={{
            borderRadius: 3,
            boxShadow:
              theme.palette.mode === 'light'
                ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)'
                : '0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)',
            border:
              theme.palette.mode === 'light'
                ? '1px solid rgba(0, 0, 0, 0.05)'
                : '1px solid rgba(255, 255, 255, 0.05)',
            height: 'fit-content',
            backdropFilter: 'blur(8px)',
            backgroundColor:
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(30, 41, 59, 0.9)',
            cursor: 'pointer',
            '&:hover': {
              boxShadow:
                theme.palette.mode === 'light'
                  ? '0 12px 40px rgba(0, 0, 0, 0.15), 0 6px 20px rgba(0, 0, 0, 0.1)'
                  : '0 12px 40px rgba(0, 0, 0, 0.5), 0 6px 20px rgba(0, 0, 0, 0.4)',
            },
            minHeight: expanded ? 'auto' : 80,
            transition: 'min-height 0.3s',
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <CardContent sx={{ p: 2 }}>
            <Flex
              alignItems='center'
              gap={2}
              sx={{
                mb: expanded ? 2 : 0,
                minHeight: 64,
                width: '100%',
              }}
            >
              <UserAvatar
                sx={{
                  width: expanded ? 60 : 40,
                  height: expanded ? 60 : 40,
                  border: `2px solid ${theme.palette.primary.main}`,
                  flexShrink: 0,
                  transition: 'width 0.3s, height 0.3s',
                }}
                user={creator}
              />
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  variant={expanded ? 'subtitle1' : 'subtitle2'}
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 0.5,
                    lineHeight: 1.2,
                    fontSize: expanded ? '1.1rem' : '1rem',
                    transition: 'font-size 0.3s',
                  }}
                  noWrap
                >
                  {creator.name}
                </Typography>
                <Typography
                  variant='caption'
                  color='text.secondary'
                  sx={{
                    display: 'block',
                    lineHeight: 1.2,
                    opacity: 1,
                    transition: 'opacity 0.3s',
                  }}
                >
                  Event Creator
                </Typography>
              </Box>
              <IconButton
                sx={{
                  color: 'text.secondary',
                  p: 0.5,
                  '&:hover': {
                    backgroundColor:
                      theme.palette.mode === 'light'
                        ? 'rgba(0, 0, 0, 0.04)'
                        : 'rgba(99, 102, 241, 0.1)',
                  },
                  transition: 'transform 0.3s, color 0.2s',
                  transform: expanded ? 'rotate(180deg)' : 'none',
                }}
                size='small'
              >
                <ExpandMore sx={{ color: 'inherit' }} />
              </IconButton>
            </Flex>

            <Collapse in={expanded} timeout={300} unmountOnExit>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Typography
                  variant='subtitle2'
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: 'text.primary',
                    fontSize: '0.875rem',
                  }}
                >
                  About the creator
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    lineHeight: 1.4,
                    color: 'text.secondary',
                    fontSize: '0.8rem',
                  }}
                >
                  User Description here ... Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Nulla quam velit, vulputate eu
                  pharetra nec, mattis ac neque. Duis vulputate commodo lectus,
                  ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend
                  tristique, tortor mauris molestie elit, et luctus enim justo
                  non diam.
                </Typography>
              </Box>
            </Collapse>
          </CardContent>
        </Card>
      </Tooltip>
    </Box>
  )
}
