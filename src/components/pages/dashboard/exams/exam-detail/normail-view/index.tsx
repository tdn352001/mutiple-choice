import { Button } from '@/components/ui/button'
import { useStartQuizMutation } from '@/hooks/services/quiz/use-start-quiz-mutation'
import { dynamicRouters } from '@/lib/constants/routers'
import { cn } from '@/lib/utils'
import { Exam } from '@/services/exams'
import { Modals, useOpenModal } from '@/store/modal'
import { useQuizStore } from '@/store/site/quiz'
import { useRouter } from 'next/navigation'
import { HTMLAttributes, PropsWithChildren } from 'react'
interface ExamNormalViewProps {
  exam: Exam
  currentAttempt?: number
  quizId?: number | string
}

const ExamNormalView = ({ exam, quizId, currentAttempt = 0 }: ExamNormalViewProps) => {
  const { mutateAsync: startQuiz, isPending } = useStartQuizMutation()

  const router = useRouter()

  const setQuiz = useQuizStore((state) => state.setQuiz)
  const openStartQuizModal = useOpenModal(Modals.START_QUIZ)

  const handleAccessToQuiz = () => {
    if (quizId) {
      router.push(dynamicRouters.quiz(quizId))
    } else {
      const isProtect = exam.protect
      if (isProtect) {
        openStartQuizModal({ exam })
      } else {
        startQuiz({
          exam_id: exam.id,
          password: '',
        }).then((res) => {
          const quiz = res.data
          setQuiz(quiz)
          router.push(dynamicRouters.quiz(quiz.id))
        })
      }
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col gap-1 w-full p-6">
        <Row>
          <TitleCell>Exam Code</TitleCell>
          <ContentCell>{exam.exam_code}</ContentCell>
        </Row>
        <Row>
          <TitleCell>Exam Name</TitleCell>
          <ContentCell>{exam.exam_name}</ContentCell>
        </Row>
        <Row>
          <TitleCell>Description</TitleCell>
          <ContentCell>{exam.description}</ContentCell>
        </Row>
        <Row>
          <TitleCell>
            <span>Number of Attempts</span>
          </TitleCell>
          <ContentCell>
            {currentAttempt}/{exam.number_attempts}
          </ContentCell>
        </Row>
        <Row>
          <TitleCell>Duration</TitleCell>
          <ContentCell>{exam.time_limit} minutes</ContentCell>
        </Row>
        <Row>
          <TitleCell>
            <span>Number of Questions</span>
          </TitleCell>
          <ContentCell>{exam.number_of_questions}</ContentCell>
        </Row>
      </div>

      <Button onClick={handleAccessToQuiz} disabled={isPending}>
        {quizId ? 'Continue Quiz' : 'Start Quiz'}
      </Button>
    </div>
  )
}

const Row = ({ children }: PropsWithChildren) => {
  return <div className="w-full grid grid-cols-2 gap-4 p-1 last:border-none">{children}</div>
}

const Cell = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('p-1', className)} {...props}>
      {children}
    </div>
  )
}

const TitleCell = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <Cell className={cn('font-medium text-right', className)} {...props}>
      {children}
    </Cell>
  )
}

const ContentCell = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <Cell className={cn('', className)} {...props}>
      {children}
    </Cell>
  )
}

export default ExamNormalView
