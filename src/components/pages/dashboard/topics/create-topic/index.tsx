'use client'

import CreateTopicForm from '@/components/forms/topics/create-topic-form'
import ProtectedRoute from '@/components/layout/protected-route'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { useGetCourseByIdQuery } from '@/hooks/services/courses'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const CreateTopicPage = () => {
  const searchParams = useSearchParams()
  const courseId = searchParams.get('course_id')

  const { data, isPending } = useGetCourseByIdQuery(courseId!, {
    enabled: !!courseId,
  })

  const course = data?.data

  return (
    <ProtectedRoute admin>
      <Container>
        <Heading
          title={DOCUMENT_TITLES.DASHBOARD.TOPICS.CREATE}
          description={DOCUMENTS_DESCRIPTIONS.DASHBOARD.TOPICS.CREATE}
        />
        <Suspense>
          <CreateTopicForm courseId={course?.id} />
        </Suspense>
      </Container>
    </ProtectedRoute>
  )
}

export default CreateTopicPage
