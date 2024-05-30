'use client'

import Breadcrumb from '@/components/custom/breadcrumb'
import UpdateCourseForm from '@/components/forms/course/update-course-form'
import ProtectedRoute from '@/components/layout/protected-route'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetCourseByIdSuspenseQuery } from '@/hooks/services/courses'
import { updateCourseBreadcrumb } from '@/lib/breadcrumb/course'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { notFound } from 'next/navigation'

const UpdateCoursePage = ({ id }: { id: string }) => {
  const { data } = useGetCourseByIdSuspenseQuery(id)

  const course = data?.data

  if (!course) {
    return notFound()
  }

  return (
    <ProtectedRoute admin>
      <ScrollArea className="w-full h-full">
        <Container>
          <Breadcrumb items={updateCourseBreadcrumb} />
          <Heading
            title={DOCUMENT_TITLES.DASHBOARD.COURSES.UPDATE}
            description={DOCUMENTS_DESCRIPTIONS.DASHBOARD.COURSES.UPDATE}
          />
          <UpdateCourseForm course={course} />
        </Container>
      </ScrollArea>
    </ProtectedRoute>
  )
}

export default UpdateCoursePage
