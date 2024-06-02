'use client'

import { CustomLink } from '@/components/custom/link'
import { DeleteTopicModal } from '@/components/modals/topic/delete-topic-modal'
import SearchTopic from '@/components/search-box/search-topics'
import TopicTable from '@/components/tables/topics-table'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { routers } from '@/lib/constants/routers'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { useUserStore } from '@/store/user'
import { Suspense } from 'react'

const TopicsPage = () => {
  const isAdmin = useUserStore((state) => state.user?.is_admin)
  return (
    <ScrollArea className="w-full h-full">
      <Container>
        <Heading
          title={DOCUMENT_TITLES.DASHBOARD.TOPICS.HOME}
          description={DOCUMENTS_DESCRIPTIONS.DASHBOARD.TOPICS.HOME}
          action={
            isAdmin && (
              <CustomLink href={routers.createTopic} icon="Plus">
                Create Topic
              </CustomLink>
            )
          }
        />
        <div>
          <Suspense>
            <SearchTopic />
          </Suspense>
          <TopicTable />
        </div>
        <DeleteTopicModal />
      </Container>
    </ScrollArea>
  )
}

export default TopicsPage
