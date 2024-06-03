'use client'

import { CustomLink } from '@/components/custom/link'
import { DeleteCourseModal } from '@/components/modals/course/delete-course-modal'
import SearchCourse from '@/components/search-box/search-course'
import CourseTable from '@/components/tables/course-table'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { routers } from '@/lib/constants/routers'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { useUserStore } from '@/store/user'
import { Suspense } from 'react'

const CoursePage = () => {
  const isAdmin = useUserStore((state) => state.user?.is_admin)
  return (
    <ScrollArea className="size-full">
      <Container>
        <Heading
          title={DOCUMENT_TITLES.DASHBOARD.COURSES.HOME}
          description={DOCUMENTS_DESCRIPTIONS.DASHBOARD.COURSES.HOME}
          action={
            isAdmin && (
              <CustomLink href={routers.createCourse} icon="Plus">
                Create Course
              </CustomLink>
            )
          }
        />
        <div>
          <Suspense>
            <SearchCourse />
          </Suspense>
          <CourseTable />
        </div>
        <DeleteCourseModal />
      </Container>
    </ScrollArea>
  )
}

export default CoursePage
