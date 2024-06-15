import { QuestionType } from '@/lib/types/question'

export type AnswerLog = {
  id: number
  answer: string
}

export type QuestionsLog = {
  question_id: 55
  question: string
  image: string
  type: QuestionType
  answer: AnswerLog[]
}

export type Quiz = {
  id: number
  exam_id: number
  attempts: number
  start_time: string
  time_limit: number
  questions_log: QuestionsLog[]
}

export type StartQuizRequest = {
  exam_id: string | number
  password?: string
}

export type StartQuizResponse = {
  data: Quiz
}
