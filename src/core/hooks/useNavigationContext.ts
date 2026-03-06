import { useParams } from 'next/navigation'

export const useNavigationContext = () => {
  const params = useParams<{ eventId: string }>()

  const eventId = params?.eventId ?? ''

  return {
    eventId,
  }
}
