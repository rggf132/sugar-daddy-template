import React from 'react'
import { Box, Link, MenuItem, Typography } from '@mui/material'

type SidebarLinkProps = {
  href?: string
  onClick?: () => void
  title?: string
  icon?: React.ReactNode
  selectedIcon?: React.ReactNode
  iconOnly?: boolean
  active?: boolean
  'data-test'?: string
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon,
  selectedIcon,
  iconOnly,
  title,
  active,
  onClick,
  ...props
}) => {
  return (
    <Link onClick={onClick} href={href} sx={{ textDecoration: 'none' }}>
      <MenuItem
        sx={{
          width: '100%',
          height: '48px',
          px: !iconOnly ? 2 : '0.5625rem',
          borderRadius: 8,
          mx: 1,
          mb: 0.5,
          backgroundColor: active ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
          color: active ? 'primary.main' : 'text.secondary',
          '&:hover': {
            backgroundColor: active
              ? 'rgba(99, 102, 241, 0.15)'
              : 'rgba(0, 0, 0, 0.04)',
            color: active ? 'primary.main' : 'text.primary',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <Box
          mr={iconOnly ? 0 : 2}
          alignSelf='center'
          sx={{
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {active && selectedIcon ? selectedIcon : icon}
        </Box>
        {!iconOnly && (
          <Typography
            color='inherit'
            fontSize='0.875rem'
            fontWeight={active ? 600 : 500}
            sx={{
              lineHeight: 1,
            }}
          >
            {title}
          </Typography>
        )}
      </MenuItem>
    </Link>
  )
}

export { SidebarLink }
