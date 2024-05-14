'use client'
import Container from '@/components/templates/container'
import { useGetCourseByIdQuery } from '@/hooks/services/courses'
import Loading from '@/components/templates/loading'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/custom/breadcrumb'
import Heading from '@/components/templates/heading'
import { getTopicsBreadcrumb } from '@/lib/breadcrumb/course'
import { Suspense } from 'react'
import SearchTopic from '@/components/pages/dashboard/course/course-detail/search-topics'
import TopicTable from '@/components/pages/dashboard/course/course-detail/topics-table'

const CourseDetailPage = ({ id }: { id: string }) => {
  const { data, isPending } = useGetCourseByIdQuery(id)
  const course = data?.data.course

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
      <Breadcrumb items={getTopicsBreadcrumb(course.id)} />
      <Heading title={course.course_name} description={course.description} />
      <div>
        <Suspense>
          <SearchTopic />
        </Suspense>
        <Suspense>
          <TopicTable course={course} />
        </Suspense>
      </div>
    </Container>
  )
}

export default CourseDetailPage
