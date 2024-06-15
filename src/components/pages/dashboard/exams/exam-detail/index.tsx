'use client'

import Breadcrumb from '@/components/custom/breadcrumb'
import ProtectedRoute from '@/components/layout/protected-route'
import StartQuizModal from '@/components/modals/quiz/start-quiz-modal'
import ExamEditView from '@/components/pages/dashboard/exams/exam-detail/edit-view'
import ExamNormalView from '@/components/pages/dashboard/exams/exam-detail/normail-view'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { ScrollAreaV2 } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { useGetExamByIdV2SuspenseQuery } from '@/hooks/services/exam'
import { examListBreadcrumb } from '@/lib/breadcrumb/course'
import { ExamViewMode, useExamDetailStore } from '@/store/site/exam-detail'
import { useUserStore } from '@/store/user'
import { useEffect } from 'react'

const ExamDetailPage = ({ id }: { id: string }) => {
  const isAdmin = useUserStore((state) => state.user?.is_admin)

  const viewMode = useExamDetailStore((state) => state.viewMode)
  const setViewMode = useExamDetailStore((state) => state.setViewMode)

  const { data } = useGetExamByIdV2SuspenseQuery(id)
  const { exam, current_attempt, quiz_id } = data

  useEffect(() => {
    if (!isAdmin) {
      setViewMode(ExamViewMode.DEFAULT)
    }
  }, [isAdmin, setViewMode])

  return (
    <ProtectedRoute>
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
          <Heading
            title={exam.exam_name}
            description={exam.description}
            action={
              isAdmin && (
                <Select
                  value={viewMode}
                  onValueChange={(mode: ExamViewMode) => {
                    setViewMode(mode)
                  }}
                >
                  <SelectTrigger className="min-w-40">
                    <p className="capitalize">
                      Mode: <span>{viewMode.toLowerCase()}</span>
                    </p>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ExamViewMode.DEFAULT}>Default</SelectItem>
                    <SelectItem value={ExamViewMode.EDIT}>Edit</SelectItem>
                  </SelectContent>
                </Select>
              )
            }
          />
          <div className="relative">
            {viewMode === ExamViewMode.DEFAULT && (
              <ExamNormalView exam={exam} currentAttempt={current_attempt} quizId={quiz_id} />
            )}
            {viewMode === ExamViewMode.EDIT && <ExamEditView exam={exam} />}
          </div>
        </Container>
        <StartQuizModal />
      </ScrollAreaV2>
    </ProtectedRoute>
  )
}

export default ExamDetailPage
