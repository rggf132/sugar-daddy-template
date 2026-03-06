import React from 'react'

export type SidebarType = {
  header?: React.ReactNode
  mainLinks: SidebarLinkOption[]
  bottomLinks?: SidebarLinkOption[]
}

export type SidebarProps = {
  profile: any
  primarySidebar: SidebarType
  nestedSidebar?: SidebarType
  sidebarWidth?: number
  collapsedSidebarWidth?: number
  collapsePrimarySidebar?: boolean
}

export type SidebarLinkProps = {
  href?: string
  onClick?: () => void
  title?: string
  icon?: React.ReactNode
  selectedIcon?: React.ReactNode
  iconOnly?: boolean
  active?: boolean
  'data-test'?: string
}

export type SidebarLinkOption = {
  title: string
  icon?: React.ReactNode
  selectedIcon?: React.ReactNode
  href?: string
  onClick?: () => void
  dataTest?: string
}
