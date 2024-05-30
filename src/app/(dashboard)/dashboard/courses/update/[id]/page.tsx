import UpdateCoursePage from '@/components/pages/dashboard/course/update-course'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'

interface PageProps {
  params: {
    id: string
  }
}

const Page = async ({ params: { id } }: PageProps) => {
  return <UpdateCoursePage id={id} />
}

export const metadata = {
  title: DOCUMENT_TITLES.DASHBOARD.COURSES.UPDATE,
  description: DOCUMENTS_DESCRIPTIONS.DASHBOARD.COURSES.UPDATE,
}

export default Page
