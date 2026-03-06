import { NextRequest } from 'next/server'
import { requireAuth, handleApiError } from 'lib/api-utils'
import { uploadMediaSchema, deleteMediaSchema } from 'lib/validations'
import { getSignedPutUrl, deleteS3Object } from 'lib/s3'

export const POST = async (request: NextRequest) => {
  try {
    await requireAuth()
    const body = await request.json()
    const { file_key, type } = uploadMediaSchema.parse(body)

    const url = await getSignedPutUrl(file_key, type)

    return Response.json({ url }, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}

export const DELETE = async (request: NextRequest) => {
  try {
    await requireAuth()
    const body = await request.json()
    const { file_key } = deleteMediaSchema.parse(body)

    if (!file_key) return Response.json({}, { status: 200 })

    await deleteS3Object(file_key)

    return Response.json({ message: 'Deleted' }, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}
