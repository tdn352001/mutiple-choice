'use client'
import Breadcrumb from '@/components/custom/breadcrumb'
import { CustomLink } from '@/components/custom/link'
import ExamsTable from '@/components/pages/dashboard/topics/topic-detail/exams-table'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetTopicByIdSuspenseQuery } from '@/hooks/services/topics'
import { getExamsBreadcrumb } from '@/lib/breadcrumb/course'
import { dynamicRouters } from '@/lib/constants/routers'
import { useUserStore } from '@/store/user'

const TopicDetailPage = ({ id }: { id: string }) => {
  const isAdmin = useUserStore((state) => state.user?.is_admin)
  const { data } = useGetTopicByIdSuspenseQuery(id)
  const topic = data.data!

  return (
    <ScrollArea className="size-full">
      <Container>
        <Breadcrumb items={getExamsBreadcrumb(topic)} />
        <Heading
          title={topic.topic_name}
          description={topic.description}
          action={
            isAdmin && (
              <CustomLink href={dynamicRouters.createTopic(topic.id)} icon="Plus">
                Create Exam
              </CustomLink>
            )
          }
        />
        <div>
          <ExamsTable topic={topic} />
        </div>
      </Container>
    </ScrollArea>
  )
}

export default TopicDetailPage
