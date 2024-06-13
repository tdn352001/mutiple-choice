import { BaseApiResponse } from '@/lib/axios'
import { BaseApiQueryParams } from '@/lib/types/query-params'

export type Answer = {
  id: number
  answer: string
  is_correct: boolean
}

export type Question = {
  id: number
  exam_id: number
  question: string
  type: string
  image?: string
  answer: Answer[]
}

export type GetQuestionsQueryParams = BaseApiQueryParams

export type GetQuestionsResponseData = {
  questions: Question[]
  meta: {
    current_page: number
    next_page?: number
    prev_page?: number
    total_pages: number
    total_items: number
  }
}

export type GetQuestionsResponse = BaseApiResponse<GetQuestionsResponseData>

export type GetQuestionByIdResponse = {
  data: Question
}

export type CreateQuestionRequest = {
  exam_id: string
  question: string
  type: string
  image?: string
  answer?: string[]
  correct_answer: string[]
}

export type CreateQuestionV2Request = {
  exam_id: string | number
  question: string
  type: string
  image?: string
  answer?: Omit<Answer, 'id'>[]
}

export type UpdateQuestionRequest = {
  exam_id: string | number
  question: string
  type: string
  image?: string
}

export type CreateAnswerRequest = {
  answer: string
  is_correct: boolean
}

export type UpdateAnswerRequest = {
  answer: string
  is_correct: boolean
}

export type CreateQuestionFromCsvRequest = {
  questions: File
  is_replace: boolean
}

export type CreateQuestionFromCsvResponse = BaseApiResponse<BaseApiResponse<{ examId: string }>[]>
