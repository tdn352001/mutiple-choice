'use client'

import Breadcrumb from '@/components/custom/breadcrumb'
import UpdateTopicForm from '@/components/forms/topics/update-topic-form'
import ProtectedRoute from '@/components/layout/protected-route'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { useGetTopicByIdSuspenseQuery } from '@/hooks/services/topics'
import { getUpdateTopicsBreadcrumb } from '@/lib/breadcrumb/course'
import { notFound } from 'next/navigation'

const UpdateTopicPage = ({ id }: { id: string }) => {
  const { data, isPending } = useGetTopicByIdSuspenseQuery(id)

  const topic = data?.data

  if (!topic) {
    return notFound()
  }

  return (
    <ProtectedRoute admin>
      <Container>
        <Breadcrumb items={getUpdateTopicsBreadcrumb(topic)} />
        <Heading title={topic.topic_name} description={topic.description} />
        <UpdateTopicForm topic={topic} />
      </Container>
    </ProtectedRoute>
  )
}

export default UpdateTopicPage
