export interface RequestTypes {
  getEvent: {
    eventId: string
  }

  getAllEvents: {
    term?: string
    categoryId?: string
    subCategoryIds?: string[]
    entryTypeId?: string
    countryId?: string
    cityId?: string
    start?: string
    end?: string
    userId?: string
    page?: number
    limit?: number
  }

  createEvent: {
    title: string
    description: string
    categoryId: string
    subCategoryIds: number[]
    entryTypeId: string
    countryId?: string
    cityId?: string
    creatorId: string
    start: string
    end: string
    file?: File
    file_key?: string | undefined
    type?: string | undefined
  }

  updateEvent: {
    title: string
    description: string
    eventId: number
    categoryId: string
    subCategoryIds: number[]
    entryTypeId: string
    countryId?: string
    cityId?: string
    creatorId: string
    start: string
    end: string
    file_key?: string
    file?: File
    file_type?: string
    type?: string | undefined
  }

  deleteEvent: { eventId: number; file_key: string }
}
