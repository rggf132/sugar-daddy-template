import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadImageApi } from '../mediaKeys'
import { useUploadMedia } from './useUploadMedia'
import { eventsKeys } from '../../events'
import { fileNameHelper } from 'src/core/helpers/fileNameHelper'

export const useUploadImage = () => {
  const queryClient = useQueryClient()
  const uploadMedia = useUploadMedia()

  return useMutation<
    { file_key: string; type: string },
    string,
    { file: File }
  >({
    mutationFn: async (variables) => {
      const fileData = fileNameHelper(variables.file)
      let imageUploadUrl: { url: string }
      try {
        imageUploadUrl = (await uploadMedia.mutateAsync(fileData)) as {
          url: string
        }
      } catch (e: unknown) {
        const err = e as { message?: string }
        throw err?.message || e
      }

      const result = await uploadImageApi({
        imageUploadUrl: imageUploadUrl.url,
        ...fileData,
        ...variables,
      })

      return { file_key: result.file_key ?? '', type: result.type ?? '' }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: eventsKeys.allEvents._def,
      })
      queryClient.invalidateQueries({
        queryKey: eventsKeys.byId._def,
      })
    },
  })
}
