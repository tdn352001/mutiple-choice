'use client'

import Breadcrumb from '@/components/custom/breadcrumb'
import CreateExamForm from '@/components/forms/exams/create-exam-form'
import ProtectedRoute from '@/components/layout/protected-route'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { createExamsBreadcrumb } from '@/lib/breadcrumb/course'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { useCreateExamStore } from '@/store/site/create-exam'

const CreateExamPage = () => {
  const initialTopic = useCreateExamStore((state) => state.topic)

  return (
    <ProtectedRoute admin>
      <ScrollArea className="size-full">
        <Container>
          <Breadcrumb items={createExamsBreadcrumb} />
          <Heading
            title={DOCUMENT_TITLES.DASHBOARD.TOPICS.CREATE}
            description={DOCUMENTS_DESCRIPTIONS.DASHBOARD.TOPICS.CREATE}
          />
          <CreateExamForm initialTopic={initialTopic} />
        </Container>
      </ScrollArea>
    </ProtectedRoute>
  )
}

export default CreateExamPage
