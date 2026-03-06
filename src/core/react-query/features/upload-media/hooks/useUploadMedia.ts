import { useMutation } from '@tanstack/react-query'
import { mediaKeys } from '../mediaKeys'
import { RequestTypes } from '../requestTypes'

export const useUploadMedia = () => {
  return useMutation<unknown, string, RequestTypes['uploadMedia']>({
    ...mediaKeys.uploadMedia,
    onSuccess: () => {},
  })
}
