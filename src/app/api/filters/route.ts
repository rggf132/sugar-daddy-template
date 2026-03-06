import { db } from 'db'
import { NextRequest } from 'next/server'
import { entryTypes } from 'src/core/constants'
import 'lib/bigint-polyfill'

export const GET = async (_: NextRequest) => {
  try {
    const categories = await db.query.category.findMany()
    const subCategories = await db.query.subCategory.findMany()

    const filters = [
      {
        id: 'tzmebx6zy',
        type: 'category',
        createEventType: 'categoryId',
        name: 'Category',
        data: categories,
      },
      {
        id: 'qn6cwnfmj',
        type: 'subCategory',
        createEventType: 'subCategoryIds',
        name: 'Sub Category',
        data: subCategories,
      },
      {
        id: '2m3d5wz7g',
        type: 'entryType',
        createEventType: 'entryTypeId',
        name: 'Entry Type',
        data: entryTypes,
      },
    ]

    return Response.json(filters, { status: 200 })
  } catch (error) {
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
