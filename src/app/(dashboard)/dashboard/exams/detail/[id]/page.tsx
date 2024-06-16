import ProtectedRoute from '@/components/layout/protected-route'
import ExamDetailPage from '@/components/pages/dashboard/exams/exam-detail'
import { examService } from '@/services/exams'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    id: string
  }
}

const Page = async ({ params: { id } }: PageProps) => {
  return (
    <ProtectedRoute>
      <ExamDetailPage id={id} />
    </ProtectedRoute>
  )
}

export const generateMetadata = async ({ params: { id } }: PageProps): Promise<Metadata> => {
  try {
    const res = await examService.getExamById(id)
    const exam = res.data

    return {
      title: exam.exam_name,
      description: exam.description,
    }
  } catch (error) {
    return notFound()
  }
}

export default Page
