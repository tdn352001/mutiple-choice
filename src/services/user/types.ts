import { BaseApiQueryParams } from '@/lib/types/query-params'
import { User } from '@/services/auth'
import { GetExamByIdV2ResponseData } from '@/services/exams'
import { QuizHistory } from '@/services/quiz'

export type GetMeResponse = {
  data: {
    user: User
  }
}

export type UpdatePasswordRequest = {
  old_password: string
  new_password: string
}

export type ExamHistory = {
  id: number
  exam_name: string
  exam_code: string
  nearest_score: string
  best_score: string
}

export type GetExamHistoryParams = BaseApiQueryParams

export type GetExamHistoryResponse = {
  data: {
    exams: ExamHistory[]
    meta: {
      current_page: number
      next_page?: number
      prev_page?: number
      total_pages: number
      total_items: number
    }
  }
}

export type GetQuizHistoryParams = {
  exam_id: number | string
}

export type GetQuizHistoryResponse = {
  data: {
    quizzes: QuizHistory[]
  }
}

export type GetQuizNotCompletedResponse = {
  data: GetExamByIdV2ResponseData[]
}
