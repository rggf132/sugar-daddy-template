export interface RequestTypes {
  uploadMedia: {
    file_key: string
    type: string
  }
  deleteMedia: {
    file_key: string
  }
  uploadImage: {
    imageUploadUrl?: string
    file: File
    file_key?: string
    type?: string
  }
}
