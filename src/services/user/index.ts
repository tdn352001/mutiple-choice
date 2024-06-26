import { getApi } from '@/lib/axios'
import {
  GetExamHistoryParams,
  GetExamHistoryResponse,
  GetMeResponse,
  GetQuizHistoryParams,
  GetQuizHistoryResponse,
  GetQuizNotCompletedResponse,
} from './types'

export * from './types'

export const userService = {
  getMe() {
    return getApi<GetMeResponse>('/user/me')
  },

  getExamHistory(params: GetExamHistoryParams) {
    return getApi<GetExamHistoryResponse>('/get_list_exam_have_been_do', {
      params,
    })
  },

  getQuizHistory(params: GetQuizHistoryParams) {
    return getApi<GetQuizHistoryResponse>('/quizzes_have_been_do_by_exam', {
      params,
    })
  },

  getQuizNotCompleted() {
    return getApi<GetQuizNotCompletedResponse>('/get_list_quiz_is_not_done')
  },
}
