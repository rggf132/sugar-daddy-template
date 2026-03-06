import React from 'react'
import { ButtonProps, SxProps, Theme } from '@mui/material'

type DropdownButtonOptionValue = unknown

export type DropdownButtonOption = {
  title: string
  value?: DropdownButtonOptionValue
  icon?: React.ReactNode
  onSelect?: (value: DropdownButtonOptionValue) => void
  sx?: SxProps<Theme>
}

export type DropdownButtonProps = ButtonProps & {
  label: string
  options: DropdownButtonOption[]
  onSelect?: (value: DropdownButtonOptionValue) => void
  denseOptions?: boolean
  collapsed?: boolean
  renderButton?: (
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  ) => React.ReactElement
  withCloseOption?: boolean
}
