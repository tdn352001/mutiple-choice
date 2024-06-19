'use client'
import { routers } from '@/lib/constants/routers'
import { useUserStore } from '@/store/user'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const IS_SERVER = typeof window === 'undefined'

interface ProtectedRouteProps {
  admin?: boolean
  children: ReactNode
}

const ProtectedRoute = ({ children, admin }: ProtectedRouteProps) => {
  const isCheckedAuth = useUserStore((state) => state.isCheckedAuth)
  const user = useUserStore.getState().user

  if (isCheckedAuth) {
    const havePermission = admin ? user?.is_admin : user

    if (havePermission) {
      return children
    }

    if (!user) {
      const callbackUrl = IS_SERVER ? routers.dashboard : window.location.pathname
      redirect(`${routers.login}?callbackUrl=${callbackUrl}`)
    }

    if (!havePermission) {
      redirect(routers.courses)
    }
  }

  return <></>
}

export default ProtectedRoute
