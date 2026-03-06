import { createMutationKeys } from '@lukemorales/query-key-factory'
import { RequestTypes } from './requestTypes'
import { APIAxiosInstance } from 'src/core/axios/api-axios-instance'
import axios from 'axios'

export async function uploadMediaApi({
  file_key,
  type,
}: RequestTypes['uploadMedia']) {
  const { data } = await APIAxiosInstance.post(`upload-media/`, {
    file_key,
    type,
  })
  return data
}

export async function deleteMediaApi({
  file_key,
}: RequestTypes['deleteMedia']) {
  const { data } = await APIAxiosInstance.delete(`upload-media/`, {
    data: { file_key },
  })
  return data
}

export async function uploadImageApi({
  imageUploadUrl,
  file,
  file_key,
  type,
}: RequestTypes['uploadImage']) {
  const { data } = await axios.put(imageUploadUrl!, file, {
    headers: {
      'Content-Type': file.type,
      'Access-Control-Allow-Origin': '*',
    },
  })
  return { data, file_key, type }
}

export const mediaKeys = createMutationKeys('upload-media', {
  uploadMedia: {
    mutationKey: null,
    mutationFn: uploadMediaApi,
  },
  deleteMedia: {
    mutationKey: null,
    mutationFn: deleteMediaApi,
  },
  uploadImage: {
    mutationKey: null,
    mutationFn: uploadImageApi,
  },
})
