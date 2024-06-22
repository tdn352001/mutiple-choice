import ProtectedRoute from '@/components/layout/protected-route'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return <ProtectedRoute admin>{children}</ProtectedRoute>
}

export default Layout
