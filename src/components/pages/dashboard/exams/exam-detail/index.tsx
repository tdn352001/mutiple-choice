'use client'
import Breadcrumb from '@/components/custom/breadcrumb'
import ExamEditView from '@/components/pages/dashboard/exams/exam-detail/edit-view'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { ScrollAreaV2 } from '@/components/ui/scroll-area'
import { useGetExamByIdSuspenseQuery } from '@/hooks/services/exam'
import { examListBreadcrumb } from '@/lib/breadcrumb/course'
import { useUserStore } from '@/store/user'
import { useRef } from 'react'

const ExamDetailPage = ({ id }: { id: string }) => {
  const isAdmin = useUserStore((state) => state.user?.is_admin)
  const { data } = useGetExamByIdSuspenseQuery(id)
  const exam = data.data!

  const ref = useRef<any>(null)

  return (
    <ScrollAreaV2 className="size-full">
      <Container>
        <Breadcrumb
          items={[
            ...examListBreadcrumb,
            {
              title: exam.exam_name,
              href: '#',
            },
          ]}
        />
        <Heading title={exam.exam_name} description={exam.description} />
        <ExamEditView exam={exam} />
      </Container>
    </ScrollAreaV2>
  )
}

export default ExamDetailPage
