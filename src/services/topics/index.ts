import { deleteApi, getApi, postApi, putApi } from '@/lib/axios'
import {
  CreateTopicRequest,
  CreateTopicResponse,
  GetTopicByIdResponse,
  GetTopicsQueryParams,
  GetTopicsResponse,
  UpdateTopicRequest,
  UpdateTopicResponse,
} from '@/services/topics/type'

export * from './type'

export const topicService = {
  getTopics(params?: GetTopicsQueryParams) {
    return getApi<GetTopicsResponse>('/topic', {
      params,
    })
  },
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

  deleteTopic(id: string | number) {
    return deleteApi(`/topic/${id}`)
  },
}
