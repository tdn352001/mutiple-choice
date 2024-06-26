'use client'

import Breadcrumb from '@/components/custom/breadcrumb'
import CreateTopicForm from '@/components/forms/topics/create-topic-form'
import ProtectedRoute from '@/components/layout/protected-route'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getCreateTopicsBreadcrumb } from '@/lib/breadcrumb/course'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'

const CreateTopicPage = () => {
  return (
    <ProtectedRoute admin>
      <ScrollArea className="size-full">
        <Container>
          <Breadcrumb items={getCreateTopicsBreadcrumb()} />
          <Heading
            title={DOCUMENT_TITLES.DASHBOARD.TOPICS.CREATE}
            description={DOCUMENTS_DESCRIPTIONS.DASHBOARD.TOPICS.CREATE}
          />
          <CreateTopicForm />
        </Container>
      </ScrollArea>
    </ProtectedRoute>
  )
}

export default CreateTopicPage
