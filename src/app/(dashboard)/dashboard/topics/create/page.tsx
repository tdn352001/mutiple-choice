import CreateTopicPage from '@/components/pages/dashboard/topics/create-topic'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { Metadata } from 'next'

const Page = async () => {
  return <CreateTopicPage />
}

export const metadata: Metadata = {
  title: DOCUMENT_TITLES.DASHBOARD.TOPICS.CREATE,
  description: DOCUMENTS_DESCRIPTIONS.DASHBOARD.TOPICS.CREATE,
}

export default Page
