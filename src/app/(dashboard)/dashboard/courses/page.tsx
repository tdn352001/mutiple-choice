import CoursePage from '@/components/pages/dashboard/course/home'
import { DOCUMENT_TITLES, DOCUMENTS_DESCRIPTIONS } from '@/lib/constants/seo'
import { Metadata } from 'next'

const Page = async () => {
  return <CoursePage />
}

export const metadata: Metadata = {
  title: DOCUMENT_TITLES.DASHBOARD.COURSES.HOME,
  description: DOCUMENTS_DESCRIPTIONS.DASHBOARD.COURSES.HOME,
}

export default Page
