'use client'

import { routers } from '@/lib/constants/routers'
import { useUserStore } from '@/store/user'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  const isCheckedAuth = useUserStore((state) => state.isCheckedAuth)
  const user = useUserStore.getState().user

  if (isCheckedAuth && user) {
    redirect(routers.dashboard)
  }

  return children
}

export default Layout
