import { EventsHomePage } from 'src/modules/events/EventsHomePage'
import { getServerThemeCookie } from 'src/lib/server-cookies'

const Page = () => {
  // Get theme from cookie on server side
  const serverThemeMode = getServerThemeCookie()

  return <EventsHomePage serverThemeMode={serverThemeMode} />
}

export default Page
