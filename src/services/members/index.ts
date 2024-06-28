import { deleteApi, getApi, postApi, postFormApi, putApi } from '@/lib/axios'
import {
  CreateMemberFromCsvRequest,
  CreateMemberFromCsvResponse,
  CreateMemberRequest,
  GetMemberExamHistoryParams,
  GetMemberExamHistoryResponse,
  GetMemberParams,
  GetMemberQuizzesParams,
  GetMemberQuizzesResponse,
  GetMemberResponse,
  UpdateMemberInfoRequest,
  UpdateMemberPasswordRequest,
} from '@/services/members/type'

export * from './type'

export const memberService = {
  getMembers(params?: GetMemberParams) {
    return getApi<GetMemberResponse>('/get_users', {
      params,
    })
  },

  createMember(request: CreateMemberRequest) {
    return postApi('/admin/create_user', request)
  },

  createMemberFromCsv(request: CreateMemberFromCsvRequest) {
    return postFormApi<CreateMemberFromCsvResponse>('/admin/create_user_by_csv', request)
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

  getMemberExamHistory(id: string | number, params?: GetMemberExamHistoryParams) {
    return getApi<GetMemberExamHistoryResponse>(`/admin/get_list_exam_by_user/${id}`, {
      params,
    })
  },
  getMemberQuizzesHistory(params: GetMemberQuizzesParams) {
    return getApi<GetMemberQuizzesResponse>('/admin/get_list_quiz_by_exam_user_id', {
      params,
    })
  },
}
