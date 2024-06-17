'use client'

import { QuizResultFormValue } from '@/components/pages/quiz/result-detail/type'
import LoadingPage from '@/components/templates/loading-page'
import { Form } from '@/components/ui/form'
import { dynamicRouters, routers } from '@/lib/constants/routers'
import { QuestionType } from '@/lib/types/question'
import { cn } from '@/lib/utils'
import { QuestionLog, QuizAnswer, quizService } from '@/services/quiz'
import { useQuizResultStore } from '@/store/site/quiz-result'
import moment from 'moment'
import { useParams, useRouter } from 'next/navigation'
import { HTMLAttributes, PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import ControlPanel from './control-panel'
import Header from './header'
import QuestionList from './question-list'

const QuizResultPage = () => {
  const [loading, setLoading] = useState(true)

  const params = useParams()
  const router = useRouter()
  const quiz = useQuizResultStore((state) => state.quiz)

  const setQuiz = useQuizResultStore((state) => state.setQuiz)

  const quizIdFromParams = Number(params.id as string)

  const defaultValues = useMemo(() => {
    if (!quiz) {
      return {}
    }

    const userAnswers: Record<string, QuizAnswer[]> = {}
    if (quiz.answers_log) {
      quiz.answers_log.forEach((item) => {
        userAnswers[item.question_id] = item.user_answers
      })
    }

    const formatAnswer = (question: QuestionLog) => {
      const questionId = question.question_id
      const previousAnswer = userAnswers[questionId]
      if (previousAnswer) {
        if (question.type === QuestionType.Normal) {
          return String(previousAnswer[0]?.id!)
        }

        if (question.type === QuestionType.Multiple) {
          return previousAnswer.map((item) => String(item?.id!)) || []
        }

        return previousAnswer[0]?.answer || ''
      }
    }

    return quiz.questions_log.reduce<QuizResultFormValue>((acc, question) => {
      const questionId = question.question_id
      const defaultAnswer = formatAnswer(question)

      return {
        ...acc,
        [questionId]: defaultAnswer,
      }
    }, {})
  }, [quiz])

  const form = useForm<QuizResultFormValue>({
    defaultValues,
  })

  useEffect(
    function setDefaultValues() {
      form.reset(defaultValues)
    },
    [defaultValues, form]
  )

  useEffect(
    function fetchQuiz() {
      const navigateUrl = quiz ? dynamicRouters.examById(quiz.exam.id) : routers.exams
      if (!quizIdFromParams) {
        toast.error('Can not find the exam')
        router.push(navigateUrl)
        return
      }

      if (!quiz || quiz.id !== quizIdFromParams) {
        setLoading(true)
        quizService
          .getQuizResult(quizIdFromParams)
          .then((res) => {
            const quiz = res.data
            setQuiz(quiz)
            setLoading(false)
          })
          .catch((err) => {
            toast.error(err.message || 'Something went wrong. Please try again later.')
            router.push(navigateUrl)
          })
      } else {
        setLoading(false)
      }
    },
    [quiz, quizIdFromParams, router, setQuiz]
  )

  if (loading || !quiz) {
    return (
      <div className="w-full h-dvh flex items-center justify-center">
        <LoadingPage />
      </div>
    )
  }

  const takenTime = moment.duration(moment(quiz.end_time).diff(moment(quiz.start_time))).asSeconds()
  const minutes = Math.floor(takenTime / 60)
  const seconds = Math.floor(takenTime % 60)

  return (
    <div className="w-full h-dvh flex flex-col bg-secondary overflow-x-hidden overflow-y-auto">
      <Form {...form}>
        <Header />

        <div className="container py-4 lg:py-8 flex flex-col items-center">
          <div className="w-full bg-background rounded-lg shadow-md p-8 flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-12 flex-shrink-0">
            <div className="self-start flex flex-col gap-1 ">
              <div className="size-16 lg:size-20 rounded-sm border border-foreground flex items-center justify-center">
                <span className="font-medium text-lg lg:text-2xl tracking-wide lg:tracking-widest">{quiz.score}</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col lg:flex-row flex-wrap gap-1 lg:gap-x-8 lg:gap-y-2">
              <p className="text-sm lg:text-base">
                <span className="font-medium">Exam: </span>
                <span>{quiz?.exam.exam_name}</span>
              </p>
              <p className="text-sm lg:text-base">
                <span className="font-medium">Ful name: </span>
                <span>{quiz?.user?.full_name}</span>
              </p>
              <p className="text-sm lg:text-base">
                <span className="font-medium">Email: </span>
                <span>{quiz?.user?.email}</span>
              </p>
              <p>
                <span className="font-medium">Start time: </span>
                <span>{moment(quiz.start_time).format('DD/MM/YYYY HH:mm:ss')}</span>
              </p>
              <p>
                <span className="font-medium">End time: </span>
                <span>{moment(quiz.end_time).format('DD/MM/YYYY HH:mm:ss')}</span>
              </p>
              <p>
                <span className="font-medium">Time limit: </span>
                <span>{quiz.exam.time_limit} minutes</span>
              </p>
              <p>
                <span className="font-medium">Time taken: </span>
                <span>{`${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ${seconds}`} </span>
              </p>
            </div>
          </div>
          <div className="w-full flex gap-4 pt-4 lg:pt-8">
            <div className="flex-1 bg-background rounded-lg shadow-md p-4">
              <QuestionList />
            </div>
            <ControlPanel />
          </div>
        </div>
      </Form>
    </div>
  )
}

const Row = ({ children }: PropsWithChildren) => {
  return <div className="flex-1 grid grid-cols-2 gap-4 p-1">{children}</div>
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

export default QuizResultPage
