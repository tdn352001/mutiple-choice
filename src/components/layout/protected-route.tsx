import { routers } from '@/lib/constants/routers'
import { UserRole } from '@/lib/types/userRole'
import { useUserStore } from '@/store/user'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const IS_SERVER = typeof window === 'undefined'

interface ProtectedRouteProps {
  role?: UserRole
  children: ReactNode
}

const ProtectedRoute = ({ children, role = UserRole.User }: ProtectedRouteProps) => {
  const isCheckedAuth = useUserStore((state) => state.isCheckedAuth)
  const user = useUserStore.getState().user

  if (isCheckedAuth) {
    if (!user) {
      const callbackUrl = IS_SERVER ? routers.dashboard : window.location.pathname
      return redirect(`${routers.login}?callbackUrl=${callbackUrl}`)
    }

    if (role === UserRole.Admin && user?.is_admin) {
      return redirect(routers.dashboard)
    }
  }

  return children
}

export default ProtectedRoute
