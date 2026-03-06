'use client'

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import localForage from 'localforage'
import { useState } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { ErrorBoundary } from 'react-error-boundary'
import { FallbackRender } from './FallbackRender'
import { ToastProvider } from './toast'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider } from 'src/core/theme/ThemeProvider'
import { GlobalModal } from './GlobalModal'
import { SidebarProvider } from 'src/contexts/SidebarContext'

interface ClientProvidersProps {
  children: React.ReactNode
  session: any
  initialSidebarCollapsed?: boolean
  serverThemeMode?: 'light' | 'dark'
}

export const ClientProviders: React.FC<ClientProvidersProps> = ({
  children,
  session,
  initialSidebarCollapsed = false,
  serverThemeMode = 'light',
}) => {
  const asyncStoragePersister = createAsyncStoragePersister({
    storage: localForage,
  })

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
          mutations: {
            // We don't retry mutations since they're not idempotent
            // We can allow retries if we implement idempotency keys and idempotency checking on the back-end
            retry: 0,
          },
        },
      }),
  )

  return (
    <SessionProvider session={session} basePath='/api/auth'>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister: asyncStoragePersister,
          maxAge: 1000 * 60 * 60 * 24,
        }}
        onSuccess={() => {
          // resume mutations after initial restore from localStorage was successful
          queryClient.resumePausedMutations()
        }}
      >
        <ErrorBoundary fallbackRender={FallbackRender}>
          <ThemeProvider initialTheme={serverThemeMode}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ToastProvider>
                <SidebarProvider
                  initialSidebarCollapsed={initialSidebarCollapsed}
                  serverThemeMode={serverThemeMode}
                >
                  <GlobalModal>{children}</GlobalModal>
                </SidebarProvider>
              </ToastProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </PersistQueryClientProvider>
    </SessionProvider>
  )
}
