'use client'
import { CustomLink } from '@/components/custom/link'
import TopicTable from '@/components/pages/dashboard/course/course-detail/topics-table'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { useGetCourseByIdSuspenseQuery } from '@/hooks/services/courses'
import { dynamicRouters } from '@/lib/constants/routers'
import { useUserStore } from '@/store/user'

const CourseDetailPage = ({ id }: { id: string }) => {
  const isAdmin = useUserStore((state) => state.user?.is_admin)
  const { data, isPending } = useGetCourseByIdSuspenseQuery(id)
  const course = data?.data

  return (
    <Container>
      <Heading
        title={course.course_name}
        description={course.description}
        action={
          isAdmin && (
            <CustomLink href={dynamicRouters.createTopic(course.id)} icon="Plus">
              Create Topic
            </CustomLink>
          )
        }
      />
      <div>
        <TopicTable course={course} />
      </div>
    </Container>
  )
}

export default CourseDetailPage
