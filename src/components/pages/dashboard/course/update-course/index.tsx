'use client'

import UpdateCourseForm from '@/components/forms/course/update-course-form'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import Loading from '@/components/templates/loading'
import { useGetCourseByIdQuery } from '@/hooks/services/courses'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { notFound } from 'next/navigation'

const UpdateCoursePage = ({ id }: { id: string }) => {
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
        title={DOCUMENT_TITLES.DASHBOARD.COURSES.UPDATE}
        description={DOCUMENTS_DESCRIPTIONS.DASHBOARD.COURSES.UPDATE}
      />

      <UpdateCourseForm course={course} />
    </Container>
  )
}

export default UpdateCoursePage
