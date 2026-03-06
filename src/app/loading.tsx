import { SSREventsListSkeleton } from 'src/components/SSRSkeletons'
import { getServerThemeMode } from 'src/lib/server-utils'

export default function Loading() {
  const themeMode = getServerThemeMode()
  return <SSREventsListSkeleton themeMode={themeMode} />
}
