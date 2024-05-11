'use client'
import Loading from '@/components/templates/loading'
import { useCurrentUser } from '@/hooks/services/user/use-current-user'
import { useUserStore } from '@/store/user'
import { PropsWithChildren, useEffect } from 'react'

const AuthProvider = ({ children }: PropsWithChildren) => {
  const setUser = useUserStore((state) => state.setUser)
  const setIsCheckedAuth = useUserStore((state) => state.setIsCheckedAuth)
  const { isLoading, data } = useCurrentUser()

  useEffect(() => {
    document.body.style.display = isLoading ? 'none' : 'block'
    if (!isLoading) {
      setIsCheckedAuth(true)
      setUser(data?.data.user)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return (
    <>
      {children}
      {isLoading && <Loading />}
    </>
  )
}

export default AuthProvider
