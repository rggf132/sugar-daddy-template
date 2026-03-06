'use client'

import React, { PropsWithChildren, useState } from 'react'
import * as RadixToast from '@radix-ui/react-toast'
import { styled } from '@mui/material/styles'
import { Toast } from './Toast'
import { useDeepCompareMemo } from 'use-deep-compare'
import {
  ToastDuration,
  ToastOptions,
  ToastProviderContext,
  ToastVariant,
} from 'src/core/toast'
import { GUID } from 'src/core/helpers/guid'

type ToastConfig = {
  id: string
  variant: ToastVariant
  message: string
  duration?: ToastDuration
}

export const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [toastConfigs, setToastConfigs] = useState<ToastConfig[]>([])

  const updateToasts = (config: ToastConfig) => {
    setToastConfigs((previous) => {
      const withRemovedById = previous?.filter((t) => t.id !== config.id)
      return [...withRemovedById, config]
    })
  }

  const success = (message: string, options?: ToastOptions) => {
    updateToasts({
      id: options?.id || GUID(),
      variant: 'SUCCESS',
      message: message,
      duration: options?.duration,
    })
  }

  const error = (message: string, options?: ToastOptions) => {
    updateToasts({
      id: options?.id || GUID(),
      variant: 'ERROR',
      message: message,
      duration: options?.duration,
    })
  }

  const progress = (message: string, options?: ToastOptions) => {
    updateToasts({
      id: options?.id || GUID(),
      variant: 'PROGRESS',
      message: message,
      duration: options?.duration,
    })
  }

  const onOpenChange = (id: string, open: boolean) => {
    if (!open) {
      // Remove the config from the array when it auto closes
      // Use timeout so that the slide out animation can finish
      setTimeout(() => {
        setToastConfigs((previous) => previous.filter((t) => t.id !== id))
      }, 500)
    }
  }

  const toastComponents = useDeepCompareMemo(
    () =>
      toastConfigs?.map((t) => {
        return (
          <Toast
            key={t.id}
            variant={t.variant}
            duration={t.duration}
            message={t.message}
            onOpenChange={(open) => {
              onOpenChange(t.id, open)
            }}
          />
        )
      }),
    [toastConfigs],
  )

  return (
    <ToastProviderContext.Provider
      value={{
        success,
        error,
        progress,
      }}
    >
      <RadixToast.Provider swipeDirection='right'>
        {children}
        {toastComponents}
        <ToastViewPort />
      </RadixToast.Provider>
    </ToastProviderContext.Provider>
  )
}

const ToastViewPort = styled(RadixToast.Viewport)`
  --viewport-padding: 25px;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: var(--viewport-padding);
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
`
