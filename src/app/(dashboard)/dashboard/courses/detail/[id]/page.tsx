import CourseDetailPage from '@/components/pages/dashboard/course/course-detail/page'
import { routers } from '@/lib/constants/routers'
import { serverHttp } from '@/lib/http-client/server'
import { GetCourseByIdResponse } from '@/services/courses'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { Metadata } from 'next'
import { redirect } from 'next/dist/server/api-utils'
import { notFound } from 'next/navigation'

const getCourseById = async (id: string) => {
  const res = await serverHttp.get<GetCourseByIdResponse>(`/course/${id}`, {
    next: {
      tags: [`course-detail-${id}`],
    },
  })

  return res.data?.data?.course
}

interface PageProps {
  params: {
    id: string
  }
}

const Page = async ({ params: { id } }: PageProps) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['course', id],
    queryFn: () => getCourseById(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CourseDetailPage id={id} />
    </HydrationBoundary>
  )
}

export const generateMetadata = async ({ params: { id } }: PageProps): Promise<Metadata> => {
  try {
    const course = await getCourseById(id)

    return {
      title: course?.course_name,
      description: course?.description,
    }
  } catch (error) {
    return notFound()
  }
}

export default Page
