'use client'

import { ConfirmSubmitQuizModal } from '@/components/pages/quiz/execute/confirm-submit-modal'
import ForceSubmitModal from '@/components/pages/quiz/execute/force-submit-modal'
import QuizResultModal from '@/components/pages/quiz/execute/quiz-result-modal'
import { QuizFormValue } from '@/components/pages/quiz/execute/type'
import LoadingPage from '@/components/templates/loading-page'
import { Form } from '@/components/ui/form'
import { useEndQuizMutation } from '@/hooks/services/quiz/use-end-quiz-mutation'
import axiosClient from '@/lib/axios'
import { dynamicRouters, routers } from '@/lib/constants/routers'
import { sessionManager } from '@/lib/session'
import { QuestionType } from '@/lib/types/question'
import { authService } from '@/services/auth'
import { AnswerLog, QuestionLog, QuizAnswer, quizService } from '@/services/quiz'
import { Modals, useOpenModal } from '@/store/modal'
import { useQuizStore } from '@/store/site/quiz'
import { useQuizResultStore } from '@/store/site/quiz-result'
import { useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useDocumentTitle } from 'usehooks-ts'
import ControlPanel from './control-panel'
import Header from './header'
import QuizFormContent from './quiz-content'

const ExecuteExam = () => {
  const [loading, setLoading] = useState(true)
  const [confirmingSubmit, setConfirmingSubmit] = useState(false)
  const [notAnsweredCount, setNotAnsweredCount] = useState(0)
  const [forceSubmit, setForceSubmit] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isTimeUp, setIsTimeUp] = useState(false)

  const params = useParams()
  const quiz = useQuizStore((state) => state.quiz)
  const router = useRouter()
  const queryClient = useQueryClient()

  const setQuiz = useQuizStore((state) => state.setQuiz)
  const setBackForExit = useQuizResultStore((state) => state.setBackForExit)
  const setQuizResult = useQuizResultStore((state) => state.setQuiz)
  const openResultModal = useOpenModal(Modals.QUIZ_RESULT)

  const quizIdFromParams = Number(params.id as string)

  const questionTypes = useMemo(() => {
    if (!quiz) {
      return {}
    }

    return quiz.questions_log.reduce<Record<string, string>>((acc, question) => {
      const questionId = question.question_id
      const questionType = question.type

      return {
        ...acc,
        [questionId]: questionType,
      }
    }, {})
  }, [quiz])

  const defaultValues = useMemo(() => {
    if (!quiz) {
      return {}
    }

    const previousAnswers: Record<string, QuizAnswer[]> = {}
    if (quiz.answers_log) {
      quiz.answers_log.forEach((item) => {
        previousAnswers[item.question_id] = item.user_answers
      })
    }

    const getDefaultAnswer = (question: QuestionLog) => {
      const questionId = question.question_id
      const previousAnswer = previousAnswers[questionId]
      if (question.type === QuestionType.Normal) {
        if (previousAnswer) {
          return JSON.stringify(previousAnswer[0])
        }
        return ''
      }

      if (question.type === QuestionType.Multiple) {
        if (previousAnswer) {
          return previousAnswer.map((item) => JSON.stringify(item))
        }

        return []
      }

      return previousAnswer?.[0]?.answer || ''
    }

    return quiz.questions_log.reduce<QuizFormValue>((acc, question) => {
      const questionId = question.question_id
      const defaultAnswer = getDefaultAnswer(question)

      return {
        ...acc,
        [questionId]: defaultAnswer,
      }
    }, {})
  }, [quiz])

  const form = useForm<QuizFormValue>({
    defaultValues,
  })

  const { mutateAsync: endQuiz, isPending: isSubmittingForm } = useEndQuizMutation(quiz?.id!)

  const formatAnswer = useCallback(
    (formValue: QuizFormValue) => {
      const answers: AnswerLog[] = []

      if (formValue) {
        for (const [questionId, userAnswer] of Object.entries(formValue)) {
          if (userAnswer) {
            try {
              const questionType = questionTypes[questionId]
              if (questionType === QuestionType.Normal) {
                if (typeof userAnswer === 'string') {
                  const finalAnswer = JSON.parse(userAnswer) as QuizAnswer
                  answers.push({
                    question_id: Number(questionId),
                    user_answers: [finalAnswer],
                  })
                } else {
                  const firstAnswer = userAnswer[0]
                  if (firstAnswer) {
                    const finalAnswer = JSON.parse(firstAnswer) as QuizAnswer
                    answers.push({
                      question_id: Number(questionId),
                      user_answers: [finalAnswer],
                    })
                  }
                }
              } else {
                if (questionType === QuestionType.Multiple) {
                  if (typeof userAnswer === 'string') {
                    const finalAnswer = JSON.parse(userAnswer) as QuizAnswer
                    answers.push({
                      question_id: Number(questionId),
                      user_answers: [finalAnswer],
                    })
                  } else {
                    const finalAnswer = userAnswer.map((answer) => {
                      return JSON.parse(answer) as QuizAnswer
                    })
                    answers.push({
                      question_id: Number(questionId),
                      user_answers: finalAnswer,
                    })
                  }
                } else if (questionType === QuestionType.Essay) {
                  if (typeof userAnswer === 'string') {
                    answers.push({
                      question_id: Number(questionId),
                      user_answers: [
                        {
                          id: null,
                          answer: userAnswer,
                        },
                      ],
                    })
                  }
                }
              }
            } catch (error) {}
          }
        }
      }

      return answers
    },
    [questionTypes]
  )

  const submitQuiz = useCallback(
    async (value: QuizFormValue) => {
      const answerFormatted = formatAnswer(value)
      setIsSubmitted(true)
      return endQuiz({
        answers_log: answerFormatted,
      })
        .then((quizResult) => {
          setBackForExit(false)
          setQuizResult(quizResult.data)
          queryClient.invalidateQueries({
            queryKey: ['quiz-history'],
          })

          setForceSubmit(false)

          if (quiz?.exam.show_answer) {
            router.replace(dynamicRouters.quizResult(quiz!.id))
          } else {
            openResultModal({
              quiz: quizResult.data,
            })
          }

          toast.success('Submit successfully')
        })
        .catch((err) => {
          toast.error(err.message || 'Something went wrong. Please try again later.')
          quizService
            .saveAnswers(quiz?.id!, {
              answers_log: formatAnswer(value),
            })
            .catch((err) => {})

          router.push(dynamicRouters.examById(quiz?.exam.id!))
        })
        .finally(() => {
          setConfirmingSubmit(false)
        })
    },
    [endQuiz, formatAnswer, openResultModal, queryClient, quiz, router, setBackForExit, setQuizResult]
  )

  const handleFormSubmit = async (value: QuizFormValue) => {
    if (!confirmingSubmit) {
      setConfirmingSubmit(true)
      const answeredCount = Object.values(value).filter((item) =>
        typeof item === 'string' ? item : item.length
      ).length

      const notAnsweredCount = quiz ? quiz.exam.number_of_questions - answeredCount : 0
      setNotAnsweredCount(notAnsweredCount)
    }
  }

  const handleConfirmSubmit = () => {
    if (!isSubmittingForm) {
      form.handleSubmit(submitQuiz)()
    }
  }

  const handleCloseConfirmSubmit = () => {
    if (!isSubmittingForm) {
      setConfirmingSubmit(false)
    }
  }

  useDocumentTitle(quiz?.exam.exam_name || 'Start Quiz')

  useEffect(
    function setDefaultValues() {
      form.reset(defaultValues)
    },
    [defaultValues, form]
  )

  const getFormValue = form.getValues

  useEffect(
    function forceSubmitExam() {
      let timeout: number

      if (forceSubmit) {
        timeout = window.setTimeout(() => {
          submitQuiz(getFormValue())
        }, 2000)
      }
      return () => {
        if (timeout) {
          window.clearTimeout(timeout)
        }
      }
    },
    [forceSubmit, getFormValue, submitQuiz]
  )

  useEffect(
    function checkTimeUp() {
      if (!quiz || isTimeUp) {
        return
      }

      const startTime = moment(quiz.start_time)
      const minutesLimit = quiz.exam.time_limit
      const endTime = startTime.add(minutesLimit, 'minutes')
      const now = moment()
      const remainingTime = Math.max(endTime.diff(now, 'seconds'), 0)

      const timeout = window.setTimeout(() => {
        setIsTimeUp(true)
        if (!isSubmitted || !isSubmittingForm) {
          setForceSubmit(true)
        }
      }, remainingTime * 1000)

      return () => window.clearTimeout(timeout)
    },
    [isSubmittingForm, isSubmitted, isTimeUp, quiz]
  )

  useEffect(
    function saveUserAnswers() {
      if (!quiz || quiz.end_time) {
        return
      }

      const startTime = moment(quiz.start_time)
      const minutesLimit = quiz.exam.time_limit
      const endTime = startTime.add(minutesLimit, 'minutes')

      let interval = 0

      const saveAnswers = () => {
        const formValue = getFormValue()
        const now = moment()
        const remainingTime = Math.max(endTime.diff(now, 'seconds'), 0)

        if (remainingTime <= 60) {
          window.clearInterval(interval)
        } else {
          quizService.saveAnswers(quiz?.id!, {
            answers_log: formatAnswer(formValue),
          })
        }
      }

      interval = window.setInterval(saveAnswers, 60 * 1000)

      return () => clearInterval(interval)
    },
    [quiz, getFormValue, formatAnswer]
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
          .continueQuiz(quizIdFromParams)
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

  useEffect(function refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token')
    if (refreshToken) {
      authService
        .refreshToken({
          headers: {
            'refresh-token': refreshToken,
          },
        })
        .then((res) => {
          const token = res.data.token
          sessionManager.accessToken = token
          axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + token
        })
    }
  }, [])

  if (loading || !quiz) {
    return (
      <div className="w-full h-dvh flex items-center justify-center">
        <LoadingPage />
      </div>
    )
  }

  return (
    <div className="w-full h-dvh flex flex-col bg-secondary overflow-x-hidden overflow-y-auto">
      <Form {...form}>
        <Header />

        <div className="container py-4 lg:py-8 flex flex-col items-center">
          <h2 className="text-3xl font-bold tracking-tight">{quiz.exam.exam_name}</h2>
          <div className="w-full flex gap-4 pt-4 lg:pt-8">
            <form
              id="quiz-form"
              className="flex-1 bg-background rounded-lg shadow-md p-4"
              onSubmit={form.handleSubmit(handleFormSubmit)}
            >
              <QuizFormContent form={form} />
            </form>
            <ControlPanel />
          </div>
        </div>
      </Form>
      <ConfirmSubmitQuizModal
        open={confirmingSubmit}
        isPending={isSubmittingForm}
        notAnsweredCount={notAnsweredCount}
        onConfirm={handleConfirmSubmit}
        onClose={handleCloseConfirmSubmit}
      />
      <QuizResultModal />
      <ForceSubmitModal open={forceSubmit} />
    </div>
  )
}

export default ExecuteExam
