import { createContext, useContext } from 'react'

export type ToastVariant = 'SUCCESS' | 'ERROR' | 'PROGRESS'
export type ToastDuration = number | 'infinite'

export type ToastOptions = {
  id?: string
  duration?: ToastDuration
}

export type ToastProviderContext = {
  success: (message: string, options?: ToastOptions) => void
  error: (message: string, options?: ToastOptions) => void
  progress: (message: string, options?: ToastOptions) => void
}

const initalState: ToastProviderContext = {
  success: (message: string, options?: ToastOptions) => null,
  error: (message: string, options?: ToastOptions) => null,
  progress: (message: string, options?: ToastOptions) => null,
}

export const ToastProviderContext = createContext(initalState)

export const useToast = () => useContext(ToastProviderContext)
