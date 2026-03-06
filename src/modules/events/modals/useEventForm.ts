'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Event } from 'src/core/react-query/features/events/types'
import { useCreateEvent } from 'src/core/react-query/features/events/hooks/useCreateEvent'
import { useUpdateEvent } from 'src/core/react-query/features/events/hooks/useUpdateEvent'
import { useSession } from 'next-auth/react'
import { useModal } from 'src/components/GlobalModal'
import { useToast } from 'src/core/toast'
import { entryTypes } from 'src/core/constants'

export interface EventFormValues {
  title: string
  description: string
  categoryId: string
  subCategoryIds: number[]
  countryId: string
  cityId: string
  entryTypeId: string
  start: string
  end: string
  imageUrl: string
  file_key: string
  file_type: string
}

export function useEventForm(event?: Event) {
  const { hideModal } = useModal()
  const toast = useToast()
  const createEvent = useCreateEvent()
  const updateEvent = useUpdateEvent()
  const { data: session } = useSession()
  const [imageFile, setImageFile] = React.useState<File | null>(null)

  const defaultValues: EventFormValues = {
    title: event?.title || '',
    description: event?.description || '',
    categoryId: event?.category_id?.toString() || '',
    subCategoryIds:
      event?.sub_category_ids
        ?.split(',')
        .map((subCategory) => Number(subCategory)) || [],
    countryId: event?.country_id?.toString() || '',
    cityId: event?.city_id?.toString() || '',
    entryTypeId:
      entryTypes.find((entryType) => entryType.type === event?.entry_type)
        ?.id || '',
    start: event?.start?.toString() || '',
    end: event?.end?.toString() || '',
    imageUrl: event?.imageUrl || '',
    file_key: event?.file_key || '',
    file_type: event?.file_type || '',
  }

  const form = useForm({ defaultValues })
  const { handleSubmit, watch } = form

  const categoryId = watch('categoryId')
  const imageUrl = watch('imageUrl')
  const fileKey = watch('file_key')
  const fileType = watch('file_type')

  const isMutating = createEvent.isPending || updateEvent.isPending

  const onSubmit = handleSubmit((data) => {
    if (event) {
      updateEvent.mutate(
        {
          ...data,
          eventId: event.id,
          creatorId: session?.user?.id ?? '',
          file_key: fileKey,
          file_type: fileType,
          categoryId: data.categoryId.toString(),
          countryId: data.countryId ? data.countryId.toString() : undefined,
          cityId: data.cityId ? data.cityId.toString() : undefined,
          subCategoryIds: data.subCategoryIds.map((sc) => Number(sc)),
          file: imageFile ?? undefined,
        },
        {
          onSuccess: () => {
            toast.success('Event updated successfully')
            hideModal()
          },
          onError: () => toast.error('Error updating event'),
        },
      )
    } else {
      createEvent.mutate(
        {
          ...data,
          creatorId: session?.user?.id ?? '',
          categoryId: data.categoryId.toString(),
          countryId: data.countryId ? data.countryId.toString() : undefined,
          cityId: data.cityId ? data.cityId.toString() : undefined,
          subCategoryIds: data.subCategoryIds.map((sc) => Number(sc)),
          file: imageFile ?? undefined,
        },
        {
          onSuccess: () => {
            toast.success('Event created successfully')
            hideModal()
          },
          onError: () => toast.error('Error creating event'),
        },
      )
    }
  })

  return {
    form,
    imageFile,
    setImageFile,
    categoryId,
    imageUrl,
    fileKey,
    fileType,
    isMutating,
    onSubmit,
    isUpdate: !!event,
  }
}
