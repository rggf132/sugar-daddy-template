import { useMutation, useQueryClient } from '@tanstack/react-query'
import { eventsKeys, createEventApi } from '../eventsKeys'
import { RequestTypes } from '../requestTypes'
import { Event } from '../types'
import { useUploadImage } from '../../upload-media'
import { handleFileUpload } from '../handleFileUpload'

export const useCreateEvent = () => {
  const queryClient = useQueryClient()
  const uploadImage = useUploadImage()

  return useMutation<Event, string, RequestTypes['createEvent']>({
    mutationFn: async (variables) => {
      const { file, ...rest } = variables
      const { file_key, type } = await handleFileUpload(file, uploadImage)

      return await createEventApi({
        ...rest,
        file_key,
        type,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: eventsKeys.infiniteEvents._def,
      })
      queryClient.invalidateQueries({
        queryKey: eventsKeys.allEvents._def,
      })
    },
  })
}
