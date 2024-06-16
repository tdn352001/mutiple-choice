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

export type GetQuizHistoryParams = {
  exam_id: number | string
}

export type GetQuizHistoryResponse = {
  data: QuizHistory[]
}

export type GetQuizNotCompletedResponse = {
  data: GetExamByIdV2ResponseData[]
}
