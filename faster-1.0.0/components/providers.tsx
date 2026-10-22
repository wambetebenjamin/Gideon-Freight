'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { SmoothScroll } from './smooth-scroll'

export function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider><SmoothScroll />{children}</SessionProvider>
}
