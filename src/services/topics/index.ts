import { getApi, postApi, putApi, deleteApi } from '@/lib/axios'
import {
  CreateTopicRequest,
  CreateTopicResponse,
  GetTopicsQueryParams,
  GetTopicsResponse,
  GetTopicByIdResponse,
  UpdateTopicRequest,
  UpdateTopicResponse,
} from '@/services/topics/type'

export * from './type'

export const topicService = {
  getTopicsByCourse(course_id: string | number, params?: GetTopicsQueryParams) {
    return getApi<GetTopicsResponse>(`/topic/course/${course_id}`, {
      params,
    })
  },
  getTopicById(id: string | number) {
    return getApi<GetTopicByIdResponse>(`/topic/${id}`)
  },
  createTopic(request: CreateTopicRequest) {
    return postApi<CreateTopicResponse>('/topic', request)
  },

  updateTopic(id: string | number, request: UpdateTopicRequest) {
    return putApi<UpdateTopicResponse>(`/topic/${id}`, request)
  },

  deleteCourse(id: string | number) {
    return deleteApi(`/topic/${id}`)
  },
}
