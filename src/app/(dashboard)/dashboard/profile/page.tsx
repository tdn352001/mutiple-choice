import ProtectedRoute from '@/components/layout/protected-route'
import ProfilePage from '@/components/pages/dashboard/profile'
import { Metadata } from 'next'

const Page = () => {
  return (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  )
}

export const metadata: Metadata = {
  title: 'Profile',
}

export default Page
