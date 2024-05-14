'use client'

import Breadcrumb from '@/components/custom/breadcrumb'
import CreateTopicForm from '@/components/forms/topics/create-topic-form'
import ProtectedRoute from '@/components/layout/protected-route'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import Loading from '@/components/templates/loading'
import { useGetCourseByIdQuery } from '@/hooks/services/courses'
import { createCourseBreadcrumb, getCreateTopicsBreadcrumb } from '@/lib/breadcrumb/course'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { notFound } from 'next/navigation'

const CreateTopicPage = ({ courseId }: { courseId: string }) => {
  const { data, isPending } = useGetCourseByIdQuery(courseId)

  const course = data?.data?.course

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
    <ProtectedRoute admin>
      <Container>
        <Breadcrumb items={getCreateTopicsBreadcrumb(course.id)} />
        <Heading
          title={DOCUMENT_TITLES.DASHBOARD.COURSES.CREATE}
          description={DOCUMENTS_DESCRIPTIONS.DASHBOARD.COURSES.CREATE}
        />
        <CreateTopicForm course={course} />
      </Container>
    </ProtectedRoute>
  )
}

export default CreateTopicPage
