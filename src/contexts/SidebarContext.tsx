'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { setSidebarCookie } from 'src/lib/cookies'

interface SidebarContextType {
  sidebarCollapsed: boolean
  serverThemeMode: 'light' | 'dark'
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
  updateSidebarCollapsed: (collapsed: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: ReactNode
  initialSidebarCollapsed?: boolean
  serverThemeMode?: 'light' | 'dark'
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
  initialSidebarCollapsed = false,
  serverThemeMode = 'light',
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    initialSidebarCollapsed,
  )

  const toggleSidebar = () => {
    const newValue = !sidebarCollapsed
    setSidebarCollapsed(newValue)
    setSidebarCookie(newValue)
  }

  const updateSidebarCollapsed = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed)
    setSidebarCookie(collapsed)
  }

  return (
    <SidebarContext.Provider
      value={{
        sidebarCollapsed,
        serverThemeMode,
        setSidebarCollapsed,
        toggleSidebar,
        updateSidebarCollapsed,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
