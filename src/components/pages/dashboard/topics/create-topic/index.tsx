'use client'

import Breadcrumb from '@/components/custom/breadcrumb'
import CreateTopicForm from '@/components/forms/topics/create-topic-form'
import ProtectedRoute from '@/components/layout/protected-route'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetCourseByIdQuery } from '@/hooks/services/courses'
import { getCreateTopicsBreadcrumb } from '@/lib/breadcrumb/course'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { useSearchParams } from 'next/navigation'

const CreateTopicPage = () => {
  const searchParams = useSearchParams()
  const courseId = searchParams.get('course_id')

  const { data } = useGetCourseByIdQuery(courseId!, {
    enabled: !!courseId,
  })

  const course = data?.data

  return (
    <ProtectedRoute admin>
      <ScrollArea className="size-full">
        <Container>
          <Breadcrumb items={getCreateTopicsBreadcrumb()} />
          <Heading
            title={DOCUMENT_TITLES.DASHBOARD.TOPICS.CREATE}
            description={DOCUMENTS_DESCRIPTIONS.DASHBOARD.TOPICS.CREATE}
          />
          <CreateTopicForm courseId={course?.id} />
        </Container>
      </ScrollArea>
    </ProtectedRoute>
  )
}

export default CreateTopicPage
