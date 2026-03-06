export const fileNameHelper = (
  file: File,
): { file_key: string; type: string } => {
  const date = new Date().toISOString().slice(0, 10)
  const uuid = crypto.randomUUID()
  const fileKey = `event-man/${date}/${uuid}/${file.name}`
  const fileType = file.type || ''

  return { file_key: fileKey, type: fileType }
}
