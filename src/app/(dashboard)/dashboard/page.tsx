import ProtectedRoute from '@/components/layout/protected-route'
import DashboardPage from '@/components/pages/dashboard/home'

const Page = () => {
  return (
    <ProtectedRoute admin>
      <DashboardPage />
    </ProtectedRoute>
  )
}

export default Page
