'use client'

import Breadcrumb from '@/components/custom/breadcrumb'
import { CustomLink } from '@/components/custom/link'
import { DeleteTopicModal } from '@/components/modals/topic/delete-topic-modal'
import SearchTopic from '@/components/search-box/search-topics'
import TopicTable from '@/components/tables/topics-table'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { useGetCourseByIdSuspenseQuery } from '@/hooks/services/courses'
import { courseListBreadcrumb } from '@/lib/breadcrumb/course'
import { dynamicRouters, routers } from '@/lib/constants/routers'
import { useCreateTopicStore } from '@/store/site/create-topic'
import { useUserStore } from '@/store/user'
import { Suspense } from 'react'

const CourseDetailPage = ({ id }: { id: string }) => {
  const isAdmin = useUserStore((state) => state.user?.is_admin)

  const setCourse = useCreateTopicStore((state) => state.setCourse)

  const {
    data: { data: course },
  } = useGetCourseByIdSuspenseQuery(id)

  return (
    <Container>
      <Breadcrumb
        items={[
          ...courseListBreadcrumb,
          {
            title: course.course_name,
            href: dynamicRouters.courseById(course.id),
          },
        ]}
      />
      <Heading
        title={course.course_name}
        description={course.description}
        action={
          isAdmin && (
            <CustomLink href={routers.createTopic} icon="Plus" onClick={setCourse.bind(this, course)}>
              Create Topic
            </CustomLink>
          )
        }
      />
      <div>
        <Suspense>
          <SearchTopic />
        </Suspense>
        <TopicTable courseId={id} />
      </div>
      <DeleteTopicModal />
    </Container>
  )
}

export default CourseDetailPage
