import CreateCoursePage from '@/components/pages/dashboard/course/create-couse'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { Metadata } from 'next'

const Page = () => {
  return <CreateCoursePage />
}

export const metadata: Metadata = {
  title: DOCUMENT_TITLES.DASHBOARD.COURSES.CREATE,
  description: DOCUMENTS_DESCRIPTIONS.DASHBOARD.COURSES.CREATE,
}

export default Page
