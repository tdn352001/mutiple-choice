import { deleteApi, getApi, postApi, putApi } from '@/lib/axios'
import {
  CreateExamRequest,
  CreateExamResponse,
  GetExamByIdResponse,
  GetExamByIdV2Response,
  GetExamQueryParams,
  GetExamsResponse,
  UpdateExamRequest,
  UpdateExamResponse,
} from './type'

export * from './type'

export const examService = {
  getExams(params?: GetExamQueryParams) {
    return getApi<GetExamsResponse>('/exam', {
      params,
    })
  },

  getExamsByTopic(topic_id: string | number, params?: GetExamQueryParams) {
    return getApi<GetExamsResponse>(`/exam/topic/${topic_id}`, {
      params,
    })
  },

  getExamById(id: string | number) {
    return getApi<GetExamByIdResponse>(`/exam/${id}`)
  },

  getExamByIdV2(id: string | number) {
    return getApi<GetExamByIdV2Response>(`/exam/exam_detail/${id}`)
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
