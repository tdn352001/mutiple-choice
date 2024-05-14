import CreateTopicPage from '@/components/pages/dashboard/topics/create-topics'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { Metadata } from 'next'
import React from 'react'

interface PageProps {
  params: {
    id: string
  }
}
const Page = async ({ params: { id } }: PageProps) => {
  return <CreateTopicPage courseId={id} />
}

export const metadata: Metadata = {
  title: DOCUMENT_TITLES.DASHBOARD.TOPICS.CREATE,
  description: DOCUMENTS_DESCRIPTIONS.DASHBOARD.TOPICS.CREATE,
}

export default Page
