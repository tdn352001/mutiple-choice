import ProtectedRoute from '@/components/layout/protected-route'
import { PreviewImageModal } from '@/components/modals/image/preview-image-modal'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ProtectedRoute>
      {children}
      <PreviewImageModal />
    </ProtectedRoute>
  )
}

export default Layout
