import { useMutation } from '@tanstack/react-query'
import { mediaKeys } from '../mediaKeys'
import { RequestTypes } from '../requestTypes'

export const useDeleteMedia = () => {
  return useMutation<unknown, string, RequestTypes['deleteMedia']>({
    ...mediaKeys.deleteMedia,
    onSuccess: () => {},
  })
}
