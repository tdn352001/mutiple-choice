import ProtectedRoute from '@/components/layout/protected-route'
import UpdateExamPage from '@/components/pages/dashboard/exams/update'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'

interface PageProps {
  params: {
    id: string
  }
}

const Page = async ({ params: { id } }: PageProps) => {
  return (
    <ProtectedRoute admin>
      <UpdateExamPage id={id} />
    </ProtectedRoute>
  )
}

export const metadata = {
  title: DOCUMENT_TITLES.DASHBOARD.EXAMS.UPDATE,
  description: DOCUMENTS_DESCRIPTIONS.DASHBOARD.EXAMS.UPDATE,
}

export default Page
