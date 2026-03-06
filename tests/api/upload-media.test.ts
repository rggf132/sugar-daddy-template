import { describe, it, expect } from 'vitest'
import { getSignedPutUrl, getSignedGetUrl } from 'lib/s3'

describe('Upload Media - S3 Integration', () => {
  const testFileKey = `test-uploads/vitest-${Date.now()}.png`

  it('should generate a presigned PUT URL for uploading', async () => {
    const url = await getSignedPutUrl(testFileKey, 'image/png')

    expect(url).toBeTruthy()
    expect(typeof url).toBe('string')
    expect(url).toContain('X-Amz-Signature')
    expect(url).toContain(encodeURIComponent(testFileKey).replace(/%2F/g, '/'))
  })

  it('should generate a presigned GET URL for reading', async () => {
    const url = await getSignedGetUrl(testFileKey)

    expect(url).toBeTruthy()
    expect(typeof url).toBe('string')
    expect(url).toContain('X-Amz-Signature')
  })
})
