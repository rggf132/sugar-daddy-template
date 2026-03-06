export interface RequestTypes {
  getAllCountries: {
    search?: string
  }
  getCitiesByCountry: {
    country: string
    search?: string
    cityId?: string
  }
}
