import { useMutation, useQueryClient } from '@tanstack/react-query'
import { eventsKeys, updateEventApi } from '../eventsKeys'
import { RequestTypes } from '../requestTypes'
import { Event } from '../types'
import { useUploadImage } from '../../upload-media'
import { useDeleteMedia } from '../../upload-media/hooks/useDeleteMedia'
import { handleFileUpload } from '../handleFileUpload'

export const useUpdateEvent = () => {
  const queryClient = useQueryClient()
  const uploadImage = useUploadImage()
  const deleteMedia = useDeleteMedia()

  return useMutation<Event, string, RequestTypes['updateEvent']>({
    mutationFn: async (variables) => {
      const { file, ...rest } = variables
      const { file_key, type } = await handleFileUpload(
        file,
        uploadImage,
        rest.file_key,
        rest.file_type,
      )

      return await updateEventApi({
        ...rest,
        file_key,
        type,
      })
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: eventsKeys.byId({ eventId: String(variables.eventId) })
          .queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: eventsKeys.infiniteEvents._def,
      })
      queryClient.invalidateQueries({
        queryKey: eventsKeys.allEvents._def,
      })

      variables?.file &&
        variables.file_key &&
        deleteMedia.mutate({ file_key: variables.file_key })
    },
  })
}
