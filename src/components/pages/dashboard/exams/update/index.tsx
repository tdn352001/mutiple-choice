'use client'

import Breadcrumb from '@/components/custom/breadcrumb'
import UpdateExamForm from '@/components/forms/exams/update-exam-form'
import ProtectedRoute from '@/components/layout/protected-route'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetExamForEditSuspenseQuery } from '@/hooks/services/exam'
import { getUpdateExamsBreadcrumb } from '@/lib/breadcrumb/course'
import { notFound } from 'next/navigation'

const UpdateExamPage = ({ id }: { id: string }) => {
  const { data } = useGetExamForEditSuspenseQuery(id)

  const exam = data?.data

  if (!exam) {
    return notFound()
  }

  return (
    <ProtectedRoute admin>
      <ScrollArea className="size-full">
        <Container>
          <Breadcrumb items={getUpdateExamsBreadcrumb(exam)} />
          <Heading title={exam.exam_name} description={exam.description} />
          <UpdateExamForm exam={exam} />
        </Container>
      </ScrollArea>
    </ProtectedRoute>
  )
}

export default UpdateExamPage
