import { PreviewImageModal } from '@/components/modals/image/preview-image-modal'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <PreviewImageModal />
    </>
  )
}

export default Layout
