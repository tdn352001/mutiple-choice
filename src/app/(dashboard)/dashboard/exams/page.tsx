import ExamsPage from '@/components/pages/dashboard/exams/home'
import { DOCUMENT_TITLES, DOCUMENTS_DESCRIPTIONS } from '@/lib/constants/seo'
import { Metadata } from 'next'

const Page = () => {
  return <ExamsPage />
}

export const metadata: Metadata = {
  title: DOCUMENT_TITLES.DASHBOARD.TOPICS.HOME,
  description: DOCUMENTS_DESCRIPTIONS.DASHBOARD.TOPICS.HOME,
}

export default Page
