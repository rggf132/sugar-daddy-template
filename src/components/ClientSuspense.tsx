'use client'

import { Suspense } from 'react'
import { BackdropLoader } from './BackdropLoader'

interface ClientSuspenseProps {
  children: React.ReactNode
}

export const ClientSuspense: React.FC<ClientSuspenseProps> = ({ children }) => {
  return <Suspense fallback={<BackdropLoader open />}>{children}</Suspense>
}
