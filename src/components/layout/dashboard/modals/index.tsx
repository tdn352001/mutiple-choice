'use client'
import { PreviewImageModal } from '@/components/modals/image/preview-image-modal'
import ChangePasswordModal from './change-password-modal'

const DashboardGlobalModals = () => {
  return (
    <>
      <ChangePasswordModal />
      <PreviewImageModal />
    </>
  )
}

export default DashboardGlobalModals
