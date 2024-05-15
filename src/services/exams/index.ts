import { getApi, postApi, putApi, deleteApi } from '@/lib/axios'
import {
  GetExamByIdResponse,
  GetExamQueryParams,
  GetExamsResponse,
  CreateExamRequest,
  CreateExamResponse,
  UpdateExamRequest,
  UpdateExamResponse,
} from './type'

export * from './type'

export const examService = {
  getExamByTopic(topic_id: string | number, params?: GetExamQueryParams) {
    return getApi<GetExamsResponse>(`/exam/topic/${topic_id}`, {
      params,
    })
  },
  getExamById(id: string | number) {
    return getApi<GetExamByIdResponse>(`/exam/${id}`)
  },
  createExam(request: CreateExamRequest) {
    return postApi<CreateExamResponse>('/exam', request)
  },

  updateExam(id: string | number, request: UpdateExamRequest) {
    return putApi<UpdateExamResponse>(`/exam/${id}`, request)
  },

  deleteExam(id: string | number) {
    return deleteApi(`/exam/${id}`)
  },
}
