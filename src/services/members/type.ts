import { BaseApiResponse } from '@/lib/axios'
import { BaseApiQueryParams } from '@/lib/types/query-params'
import { User } from '@/services/auth'
import { Exam } from '@/services/exams'
import { QuizHistory } from '@/services/quiz'
import { ExamHistory } from '@/services/user'

export type Member = User

export type GetMemberParams = BaseApiQueryParams

export type GetMemberResponseData = {
  users: Member[]
  meta: {
    current_page: number
    next_page?: number
    prev_page?: number
    total_pages: number
    total_items: number
  }
}

export type GetMemberResponse = BaseApiResponse<GetMemberResponseData>

export type UpdateMemberInfoRequest = {
  full_name: string
  is_admin: boolean
  active: boolean
}

export type UpdateMemberPasswordRequest = {
  password: string
}

export type GetMemberExamHistoryParams = BaseApiQueryParams

export type GetMemberExamHistoryResponse = {
  data: {
    exams: ExamHistory[]
    user: User
    meta: {
      current_page: number
      next_page?: number
      prev_page?: number
      total_pages: number
      total_items: number
    }
  }
}

export type GetMemberQuizzesParams = {
  exam_id: number | string
  user_id: number | string
}

export type GetMemberQuizzesResponse = {
  data: {
    user: User
    exam: Exam
    quizzes: QuizHistory[]
  }
}
