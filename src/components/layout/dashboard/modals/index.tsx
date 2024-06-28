'use client'
import EditProfileModal from '@/components/layout/dashboard/modals/edit-profile-modal'
import { PreviewImageModal } from '@/components/modals/image/preview-image-modal'
import ChangePasswordModal from './change-password-modal'

const DashboardGlobalModals = () => {
  return (
    <>
      <ChangePasswordModal />
      <EditProfileModal />
      <PreviewImageModal />
    </>
  )
}

export default DashboardGlobalModals
