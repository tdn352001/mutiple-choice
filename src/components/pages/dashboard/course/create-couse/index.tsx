import Breadcrumb from '@/components/custom/breadcrumb'
import CreateCourseForm from '@/components/forms/course/create-course-form'
import ProtectedRoute from '@/components/layout/protected-route'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { createCourseBreadcrumb } from '@/lib/breadcrumb/course'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'

const CreateCoursePage = () => {
  return (
    <ProtectedRoute admin>
      <ScrollArea className="size-full">
        <Container>
          <Breadcrumb items={createCourseBreadcrumb} />
          <Heading
            title={DOCUMENT_TITLES.DASHBOARD.COURSES.CREATE}
            description={DOCUMENTS_DESCRIPTIONS.DASHBOARD.COURSES.CREATE}
          />
          <CreateCourseForm />
        </Container>
      </ScrollArea>
    </ProtectedRoute>
  )
}

export default CreateCoursePage
