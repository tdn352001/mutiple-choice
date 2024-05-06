'use client'

import { PropsWithChildren } from 'react'
import { useUserStore } from '@/store/user'
import { redirect } from 'next/navigation'
import { routers } from '@/lib/constants/routers'

const Layout = ({ children }: PropsWithChildren) => {
  const isCheckedAuth = useUserStore((state) => state.isCheckedAuth)
  const user = useUserStore.getState().user

  if (isCheckedAuth && user) {
    console.log('layout call redirect')
    redirect(routers.dashboard)
  }

  return children
}

export default Layout
