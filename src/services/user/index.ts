import { getApi, postApi } from '@/lib/axios'
import {
  GetMeResponse,
  GetQuizHistoryParams,
  GetQuizHistoryResponse,
  GetQuizNotCompletedResponse,
  UpdatePasswordRequest,
} from './types'

export * from './types'

export const userService = {
  getMe() {
    return getApi<GetMeResponse>('/user/me')
  },

  updatePassword(request: UpdatePasswordRequest) {
    return postApi('/update_password', request)
  },

  getQuizHisory(params: GetQuizHistoryParams) {
    return getApi<GetQuizHistoryResponse>('/quizzes_have_been_do_by_exam', { params })
  },

  getQuizNotCompleted() {
    return getApi<GetQuizNotCompletedResponse>('/get_list_quiz_is_not_done')
  },
}
