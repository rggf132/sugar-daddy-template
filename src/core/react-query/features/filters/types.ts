export type FilterData = {
  id: string
  category_id?: string
  type: string
}

export type Filter = {
  id: string
  type: 'category' | 'subCategory' | 'country' | 'city' | 'entryType'
  createEventType:
    | 'categoryId'
    | 'subCategoryIds'
    | 'countryId'
    | 'cityId'
    | 'entryTypeId'
  name: string
  data: FilterData[]
}
