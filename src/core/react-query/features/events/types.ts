export interface Event {
  id: number
  title: string
  start: string
  end: string
  description: string
  creator_id: string
  entry_type: string
  file_key?: string
  file_type?: string
  creator_name: string
  creator_email: string
  creator_image?: string
  country_id?: number
  country_name?: string
  city_id?: number
  city_name?: string
  category_id: number
  category_type: string
  sub_category_ids?: string
  sub_category_types?: string
  imageUrl?: string
  created_at?: string
  modified_at?: string
  location_type?: string
}

export interface PaginatedEventsResponse {
  events: Event[]
  pagination: {
    page: number
    limit: number
    hasMore: boolean
  }
}
