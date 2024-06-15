import { deleteApi, postApi, putApi } from '@/lib/axios'
import { UpdateMemberInfoRequest, UpdateMemberPasswordRequest } from '@/services/members/type'
import { StartQuizRequest, StartQuizResponse } from '@/services/quiz/type'

export * from './type'

export const quizService = {
  startQuiz(request: StartQuizRequest) {
    return postApi<StartQuizResponse>('/quiz/start_quiz/', request)
  },

  updateMemberInfo(memberId: string | number, request: UpdateMemberInfoRequest) {
    return putApi(`/admin/update_user/${memberId}`, request)
  },

  updateMemberPassword(memberId: string | number, request: UpdateMemberPasswordRequest) {
    return putApi(`/admin/update_user_password/${memberId}`, request)
  },

  deleteMember(id: string | number) {
    return deleteApi(`/${id}`)
  },
}
