'use client'

import { Box, Button, Typography, useTheme } from '@mui/material'
import { ArrowDropDown, Delete, Update } from '@mui/icons-material'
import { DropdownButton } from 'src/components/DropdownButton'
import { DropdownButtonOption } from 'src/components/DropdownButton/types'
import { Flex } from 'src/components/Flex'
import { useModal } from 'src/components/GlobalModal'
import { CreateUpdateEventModal } from './modals/CreateUpdateEventModal'
import { DeleteEventModal } from './modals/DeleteEventModal'
import { Event } from 'src/core/react-query/features/events/types'

interface EventHeaderProps {
  event: Event
  canEdit: boolean
}

export const EventHeader: React.FC<EventHeaderProps> = ({ event, canEdit }) => {
  const theme = useTheme()
  const { showModal } = useModal()

  const actions: DropdownButtonOption[] = [
    {
      title: 'Update Event',
      value: 'Update Event',
      icon: <Update color='primary' />,
      onSelect: () =>
        showModal(
          <CreateUpdateEventModal event={event} modalTitle='Update Event' />,
          { onClose: () => {} },
        ),
    },
    {
      title: 'Delete Event',
      value: 'Delete Event',
      onSelect: () =>
        showModal(
          <DeleteEventModal eventId={event.id} file_key={event?.file_key} />,
        ),
      sx: { color: 'error.main' },
      icon: <Delete />,
    },
  ]

  return (
    <Box
      sx={{
        p: 3,
        pb: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Flex
        justifyContent='space-between'
        alignItems='flex-start'
        flexWrap='wrap'
        gap={2}
      >
        <Typography
          variant='h4'
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            lineHeight: 1.2,
          }}
        >
          {event.title}
        </Typography>
        {canEdit && (
          <DropdownButton
            label='Actions'
            options={actions}
            renderButton={(onClick) => (
              <Button
                variant='outlined'
                endIcon={<ArrowDropDown sx={{ color: 'inherit' }} />}
                onClick={onClick}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                }}
              >
                Actions
              </Button>
            )}
          />
        )}
      </Flex>
    </Box>
  )
}
