import { ClientLayout } from 'src/components/ClientLayout'
import { ClientProviders } from 'src/components/ClientProviders'
import { ClientSuspense } from 'src/components/ClientSuspense'
import { ThemeInitializer } from 'src/components/ThemeInitializer'
import { getInitialSidebarState } from 'src/lib/mobile-detection'
import {
  getServerThemeCookie,
  getServerSidebarCookie,
} from 'src/lib/server-cookies'
import { headers } from 'next/headers'
import { auth } from 'lib/auth'

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const [session, headersList] = await Promise.all([auth(), headers()])
  const userAgent = headersList.get('user-agent') || ''

  const serverThemeMode = getServerThemeCookie()
  const { sidebar, sidebarState } = getServerSidebarCookie()

  const initialSidebarCollapsed =
    sidebar !== null ? sidebarState : getInitialSidebarState(userAgent)

  return (
    <html>
      <meta name='referrer' content='no-referrer' />
      <body style={{ margin: 0 }}>
        <ThemeInitializer />
        <ClientSuspense>
          <ClientProviders
            session={session}
            initialSidebarCollapsed={initialSidebarCollapsed}
            serverThemeMode={serverThemeMode}
          >
            <ClientLayout>{children}</ClientLayout>
          </ClientProviders>
        </ClientSuspense>
      </body>
    </html>
  )
}

export default RootLayout
