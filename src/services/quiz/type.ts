import { QuestionType } from '@/lib/types/question'
import { Exam } from '@/services/exams'

export type QuizAnswer = {
  id?: number | null
  answer: string
}

export type QuestionLog = {
  question_id: 55
  question: string
  image: string
  type: QuestionType
  answers: QuizAnswer[]
}

export type AnswerLog = {
  question_id: string | number
  user_answers: QuizAnswer[]
}

export type Quiz = {
  id: number
  exam: Exam
  attempts: number
  start_time: string
  end_time?: string
  time_limit: number
  questions_log: QuestionLog[]
  answers_log?: AnswerLog[]
}

export type QuizHistory = {
  id: number
  exam_id: number
  attempts: number
  score: string
  start_time: string
  end_time: string
}

export type StartQuizRequest = {
  exam_id: string | number
  password?: string
}

export type StartQuizResponse = {
  data: Quiz
}

export type ContinueQuizResponse = {
  data: Quiz
}

export type EndQuizRequest = {
  answers_log: AnswerLog[]
}

export type SaveAnswersRequest = {
  answers_log: AnswerLog[]
}
