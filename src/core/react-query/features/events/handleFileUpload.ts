import { UseMutationResult } from '@tanstack/react-query'

interface FileUploadResult {
  file_key: string | undefined
  type: string | undefined
}

type UploadImageMutation = UseMutationResult<
  { file_key: string; type: string },
  string,
  { file: File }
>

export async function handleFileUpload(
  file: File | null | undefined,
  uploadImage: UploadImageMutation,
  fallbackKey?: string,
  fallbackType?: string,
): Promise<FileUploadResult> {
  if (!file) {
    return { file_key: fallbackKey, type: fallbackType }
  }

  const data = await uploadImage.mutateAsync({ file })
  return { file_key: data.file_key, type: data.type }
}
