'use client'
import Breadcrumb from '@/components/custom/breadcrumb'
import { CustomLink } from '@/components/custom/link'
import ExamsTable from '@/components/pages/dashboard/topics/topic-detail/exams-table'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetTopicByIdSuspenseQuery } from '@/hooks/services/topics'
import { getExamsBreadcrumb } from '@/lib/breadcrumb/course'
import { routers } from '@/lib/constants/routers'
import { useCreateExamStore } from '@/store/site/create-exam'
import { useUserStore } from '@/store/user'
import { Suspense } from 'react'
import SearchTopic from './search-topics'

const TopicDetailPage = ({ id }: { id: string }) => {
  const isAdmin = useUserStore((state) => state.user?.is_admin)
  const { data } = useGetTopicByIdSuspenseQuery(id)
  const topic = data.data!

  const setTopic = useCreateExamStore((state) => state.setTopic)

  return (
    <ScrollArea className="size-full">
      <Container>
        <Breadcrumb items={getExamsBreadcrumb(topic)} />
        <Heading
          title={topic.topic_name}
          description={topic.description}
          action={
            isAdmin && (
              <CustomLink href={routers.createExam} icon="Plus" onClick={setTopic.bind(this, topic)}>
                Create Exam
              </CustomLink>
            )
          }
        />
        <div>
          <Suspense>
            <SearchTopic />
          </Suspense>
          <ExamsTable topic={topic} />
        </div>
      </Container>
    </ScrollArea>
  )
}

export default TopicDetailPage
