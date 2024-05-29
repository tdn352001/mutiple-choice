'use client'
import { CustomLink } from '@/components/custom/link'
import TopicTable from '@/components/pages/dashboard/course/course-detail/topics-table'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import Loading from '@/components/templates/loading'
import { useGetCourseByIdQuery } from '@/hooks/services/courses'
import { dynamicRouters } from '@/lib/constants/routers'
import { useUserStore } from '@/store/user'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

const CourseDetailPage = ({ id }: { id: string }) => {
  const isAdmin = useUserStore((state) => state.user?.is_admin)
  const { data, isPending } = useGetCourseByIdQuery(id)
  const course = data?.data

  if (isPending) {
    return (
      <Container>
        <Loading />
      </Container>
    )
  }

  if (!course) {
    return notFound()
  }

  return (
    <Container>
      <Heading
        title={course.course_name}
        description={course.description}
        action={
          isAdmin && (
            <CustomLink href={dynamicRouters.createTopic(course.id)} icon="Plus">
              Create Topic
            </CustomLink>
          )
        }
      />
      <div>
        <Suspense>
          <TopicTable course={course} />
        </Suspense>
      </div>
    </Container>
  )
}

export default CourseDetailPage
