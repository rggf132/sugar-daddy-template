'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Box, Button, Typography } from '@mui/material'
import { PageUrls } from 'src/core/page-urls'
import { UserAvatar } from './UserAvatar'
import { signIn, signOut, useSession } from 'next-auth/react'
import { DropdownButton } from 'src/components/DropdownButton'
import { DropdownButtonOption } from 'src/components/DropdownButton/types'
import { Logout } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export const Profile = () => {
  const { data: session, status } = useSession()
  const user = session?.user
  const router = useRouter()
  const pathName = usePathname()

  if (!session && status !== 'loading') {
    return (
      <Button
        variant='contained'
        onClick={() =>
          signIn('google', {
            callbackUrl: pathName,
          })
        }
        sx={{ mr: 2 }}
      >
        Log in
      </Button>
    )
  }

  const actions: DropdownButtonOption[] = [
    {
      title: 'Profile',
      value: 'Profile',
      icon: <AccountCircleIcon color='primary' />,
      onSelect: () => router.push(PageUrls.profile()),
    },
    {
      title: 'Log out',
      value: 'Log out',
      onSelect: () => signOut({ callbackUrl: window.location.origin }),
      sx: {
        color: 'error.main',
      },
      icon: <Logout />,
    },
  ]

  return (
    <DropdownButton
      label='Actions'
      options={actions}
      fullWidth
      renderButton={(onClick) => (
        <Box
          mr={2}
          padding={1}
          sx={{ cursor: 'pointer' }}
          display='flex'
          alignItems='center'
          onClick={(e) =>
            onClick(e as unknown as React.MouseEvent<HTMLButtonElement>)
          }
        >
          <Typography mr={2} alignSelf='center'>
            {user?.name}
          </Typography>
          <UserAvatar user={user ?? {}} />
        </Box>
      )}
    />
  )
}
