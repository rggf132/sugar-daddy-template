import { getServerThemeCookie } from 'src/lib/server-cookies'
import { ProfilePageWrapper } from './ProfilePageWrapper'

const Page = () => {
  const serverThemeMode = getServerThemeCookie()

  return <ProfilePageWrapper serverThemeMode={serverThemeMode} />
}

export default Page
