type LocationType = {
  id: string
  type: string
}

type EntryType = {
  id: string
  type: string
}

type CategoryType = {
  id: string
  type: string
}

type SubCategoryType = {
  id: string
  type: string
}

type SubCategoryGroup = {
  categoryId: string
  data: SubCategoryType[]
}

type EventType = {
  id: string
  title: string
  allDay: boolean
  start: string
  end: string
  description: string
  location: LocationType
  entryType: EntryType
  tax?: number
  category: CategoryType
  subCategory: SubCategoryType
}

function getRandomElement<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

function generateEventData(
  locations: LocationType[],
  entryTypes: EntryType[],
  categories: CategoryType[],
  subCategories: SubCategoryGroup[],
): EventType[] {
  const events: EventType[] = Array.from({ length: 50 }, (_, index) => {
    const categoryId = getRandomElement(categories).id
    const category = categories.find((c) => c.id === categoryId)!
    const subCategoryGroup = subCategories.find(
      (subCategory) => subCategory.categoryId === categoryId,
    )!

    return {
      id: (index + 1).toString(),
      title: `Sample Event ${index + 1}`,
      allDay: false,
      start: '2024-01-17T08:00:00',
      end: '2024-01-17T10:00:00',
      description: `This is a sample event ${index + 1}`,
      location: getRandomElement(locations),
      entryType: getRandomElement(entryTypes),
      tax: Math.floor(Math.random() * 50) + 1,
      category,
      subCategory: getRandomElement(subCategoryGroup.data),
    }
  })

  return events
}

export const eventDataGenerator = (
  data1: LocationType[],
  data2: EntryType[],
  data3: CategoryType[],
  data4: SubCategoryGroup[],
) => {
  return generateEventData(data1, data2, data3, data4)
}
