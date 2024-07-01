import { BaseApiQueryParams } from '@/lib/types/query-params'

export type Exam = {
  id: number
  exam_name: string
  exam_code: string
  topic_id: number
  description: string
  protect: boolean
  password: string
  number_of_questions: number
  time_limit: number
  number_attempts: number
  onsite_scoring: boolean
  show_answer: boolean
  active: boolean
}

export type GetExamQueryParams = BaseApiQueryParams

export type GetExamsResponse = {
  data: {
    exams: Exam[]
    meta: {
      current_page: number
      next_page?: number
      prev_page?: number
      total_pages: number
      total_items: number
    }
  }
}

export type GetExamByIdResponse = {
  data: Exam
}

export type GetExamByIdV2ResponseData = {
  exam: Exam
  quiz_id?: number | string
  current_attempt?: number
}

export type GetExamByIdV2Response = {
  data: GetExamByIdV2ResponseData
}

export type CreateExamRequest = {
  exam_name: string
  exam_code: string
  topic_id: number
  description?: string
  protect: boolean
  password?: string
  number_of_questions: number
  time_limit: number
  number_attempts: number
  onsite_scoring: boolean
  active?: boolean
}

export type CreateExamResponse = {
  data: Exam
}

export type UpdateExamRequest = CreateExamRequest

export type UpdateExamResponse = CreateExamResponse
