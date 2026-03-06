'use client'

import React, { useState, createContext, useContext } from 'react'
import { Dialog, DialogProps } from '@mui/material'
import { useDeepCompareMemo } from 'use-deep-compare'

type Options = Partial<DialogProps> & {
  // If an id is passed then calling show with the same id will replace the modal instead of adding a new one
  modalId?: string
  hideOthers?: boolean
}

type GlobalModalContext = {
  showModal: (modalContentNode: React.ReactNode, dialogProps?: Options) => void
  hideModal: () => void
  hideAllModals: () => void
}

const initalState: GlobalModalContext = {
  showModal: () => {},
  hideModal: () => {},
  hideAllModals: () => {},
}

const GlobalModalContext = createContext(initalState)
export const useModal = () => useContext(GlobalModalContext)

type ModalConfig = {
  modalId: string
  component: React.ReactNode
  dialogProps: Partial<DialogProps>
}

const GUID = (append = ''): string => {
  let d = new Date().getTime()
  const uuid = 'xxxx-xxxx-xxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    // eslint-disable-next-line
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })

  return append ? `${uuid}-${append}` : uuid
}

export const GlobalModal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modals, setModals] = useState<ModalConfig[]>([])

  const showModal = (modalContentNode: React.ReactNode, options?: Options) => {
    const modalWithIdExists =
      !!options?.modalId && !!modals.find((m) => m.modalId === options?.modalId)

    let newModals: ModalConfig[] = []
    if (modalWithIdExists) {
      // Replace the modal in the array rather than adding pushing a new one
      newModals =
        modals?.map((m) => {
          if (m.modalId === options?.modalId) {
            return {
              modalId: m.modalId,
              component: modalContentNode,
              dialogProps: (options ?? {}) as Partial<DialogProps>,
            }
          }
          return m
        }) ?? []
    } else {
      newModals = [
        ...(options?.hideOthers ? [] : modals),
        {
          modalId: options?.modalId || GUID(),
          component: modalContentNode,
          dialogProps: (options ?? {}) as Partial<DialogProps>,
        },
      ]
    }

    setModals(newModals)
  }

  const hideModal = () => {
    if (!modals?.length) {
      setModals([])
    }
    const newModals = modals.slice(0, -1)
    setModals(newModals)
  }

  const hideAllModals = () => {
    setModals([])
  }

  const nestedModals = useDeepCompareMemo(() => {
    const nestedModalsRecursive = (modalConfigs: ModalConfig[]) => {
      if (!modalConfigs?.length) {
        return null
      }
      const currentModal = modalConfigs[0]
      const remainingModals = modalConfigs.slice(1)

      return (
        <Dialog
          open={!!currentModal}
          onClose={currentModal?.dialogProps?.onClose || hideModal}
          sx={{
            minWidth: '30rem',
            ...currentModal?.dialogProps?.sx,
          }}
          fullWidth
          {...currentModal?.dialogProps}
        >
          {currentModal.component}
          {nestedModalsRecursive(remainingModals)}
        </Dialog>
      )
    }

    return nestedModalsRecursive(modals)
  }, [modals])

  return (
    <GlobalModalContext.Provider
      value={{ showModal, hideModal, hideAllModals }}
    >
      {nestedModals}
      {children}
    </GlobalModalContext.Provider>
  )
}
