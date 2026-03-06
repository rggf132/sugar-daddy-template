'use client'

import React, { memo } from 'react'
import { Avatar, SxProps, Theme, Typography } from '@mui/material'

type UserAvatarProps = {
  user: {
    name?: string
    image?: string
    email?: string
  }
  sx?: SxProps<Theme>
}

export const UserAvatar: React.FC<UserAvatarProps> = memo(({ user, sx }) => {
  const capitalFirstLetter = (name: string | undefined) => {
    if (!name) {
      return ''
    }
    return name?.[0]?.toUpperCase()
  }

  const firstName = user?.name?.split(' ')[0]
  const lastName = user?.name?.split(' ')[1]

  const userInitials =
    capitalFirstLetter(firstName) + capitalFirstLetter(lastName)

  return (
    <Avatar
      srcSet={user?.image}
      sx={{ bgcolor: '#A4B5D2', referrerPolicy: 'no-referrer', ...sx }}
    >
      <Typography>{userInitials}</Typography>
    </Avatar>
  )
})

UserAvatar.displayName = 'UserAvatar'
