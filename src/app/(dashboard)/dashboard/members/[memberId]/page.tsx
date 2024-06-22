import ProtectedRoute from '@/components/layout/protected-route'
import MemberProfile from '@/components/pages/dashboard/members/profile'
import { Metadata } from 'next'

interface PageProps {
  params: {
    memberId: string
  }
}

const Page = async ({ params: { memberId } }: PageProps) => {
  return (
    <ProtectedRoute admin>
      <MemberProfile memberId={memberId} />
    </ProtectedRoute>
  )
}

export const metadata: Metadata = {
  title: 'Profile',
}

export default Page
