import Container from '@/components/templates/container'
import Loading from '@/components/templates/loading'
import { courseService } from '@/services/courses'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    id: string
  }
}

const Page = async ({ params: { id } }: PageProps) => {
  return (
    <Container>
      <Loading />
    </Container>
  )
}

export const generateMetadata = async ({ params: { id } }: PageProps): Promise<Metadata> => {
  try {
    const res = await courseService.getCourseById(id)
    const course = res.data

    return {
      title: course?.course_name,
      description: course?.description,
    }
  } catch (error) {
    return notFound()
  }
}

export default Page
