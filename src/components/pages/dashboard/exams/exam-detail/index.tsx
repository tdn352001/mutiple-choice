'use client'

import Breadcrumb from '@/components/custom/breadcrumb'
import StartQuizModal from '@/components/modals/quiz/start-quiz-modal'
import ExamEditView from '@/components/pages/dashboard/exams/exam-detail/edit-view'
import ExamNormalView from '@/components/pages/dashboard/exams/exam-detail/normail-view'
import ExamStatsView from '@/components/pages/dashboard/exams/exam-detail/stats-view'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { ScrollAreaV2 } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { useGetExamByIdV2SuspenseQuery } from '@/hooks/services/exam'
import { examListBreadcrumb } from '@/lib/breadcrumb/course'
import { ExamViewMode, useExamDetailStore } from '@/store/site/exam-detail'
import { useUserStore } from '@/store/user'

const ExamDetailPage = ({ id }: { id: string }) => {
  const isAdmin = useUserStore((state) => state.user?.is_admin)

  const viewMode = useExamDetailStore((state) => state.viewMode)
  const setViewMode = useExamDetailStore((state) => state.setViewMode)

  const { data } = useGetExamByIdV2SuspenseQuery(id)
  const { exam, current_attempt, quiz_id } = data

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
        <Heading
          className={isAdmin ? 'smu:[&>div:first-child]:flex-col smu:[&>div:first-child]:gap-4' : undefined}
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
                    Mode: <span>{viewMode?.toLowerCase()}</span>
                  </p>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ExamViewMode.DEFAULT}>Default</SelectItem>
                  <SelectItem value={ExamViewMode.EDIT}>Edit</SelectItem>
                  <SelectItem value={ExamViewMode.STATS}>Stats</SelectItem>
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
          {viewMode === ExamViewMode.STATS && <ExamStatsView exam={exam} />}
        </div>
      </Container>
      <StartQuizModal />
    </ScrollAreaV2>
  )
}

export default ExamDetailPage
