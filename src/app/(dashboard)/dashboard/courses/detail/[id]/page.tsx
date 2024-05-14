import CourseDetailPage from '@/components/pages/dashboard/course/course-detail'
import { serverFetchService } from '@/lib/http-client/server'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    id: string
  }
}

const Page = async ({ params: { id } }: PageProps) => {
  return <CourseDetailPage id={id} />
}

export const generateMetadata = async ({ params: { id } }: PageProps): Promise<Metadata> => {
  try {
    const course = await serverFetchService.getCourseById(id)

    return {
      title: course?.course_name,
      description: course?.description,
    }
  } catch (error) {
    return notFound()
  }
}

export default Page
