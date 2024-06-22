import { BaseApiQueryParams } from '@/lib/types/query-params'

export type StatsDashboardResponse = {
  data: {
    courses: number
    topics: number
    users: number
    exams: number
    quizzes: number
  }
}

export type UserByExamHistory = {
  id: number
  email: string
  full_name: string
  is_admin: boolean
  active: boolean
  nearest_score: string
  best_score: string
}

export type GetUserByExamHistoryParams = BaseApiQueryParams

export type GetUserByExamHistoryResponse = {
  data: {
    users: UserByExamHistory[]
    meta: {
      current_page: number
      next_page?: number
      prev_page?: number
      total_pages: number
      total_items: number
    }
  }
}
