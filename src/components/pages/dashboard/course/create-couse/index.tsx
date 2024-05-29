import CreateCourseForm from '@/components/forms/course/create-course-form'
import ProtectedRoute from '@/components/layout/protected-route'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'

const CreateCoursePage = () => {
  return (
    <ProtectedRoute admin>
      <Container>
        <Heading
          title={DOCUMENT_TITLES.DASHBOARD.COURSES.CREATE}
          description={DOCUMENTS_DESCRIPTIONS.DASHBOARD.COURSES.CREATE}
        />
        <CreateCourseForm />
      </Container>
    </ProtectedRoute>
  )
}

export default CreateCoursePage
