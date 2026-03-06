import { useMutation, useQueryClient } from '@tanstack/react-query'
import { eventsKeys, eventsMutationKeys } from '../eventsKeys'
import { RequestTypes } from '../requestTypes'
import { Event } from '../types'
import { useDeleteMedia } from '../../upload-media/hooks/useDeleteMedia'

export const useDeleteEvent = () => {
  const queryClient = useQueryClient()
  const deleteMedia = useDeleteMedia()

  return useMutation<Event, string, RequestTypes['deleteEvent']>({
    ...eventsMutationKeys.deleteEvent,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: eventsKeys.infiniteEvents._def,
      })
      queryClient.invalidateQueries({
        queryKey: eventsKeys.allEvents._def,
      })
      deleteMedia.mutate({ file_key: variables.file_key })
    },
  })
}
