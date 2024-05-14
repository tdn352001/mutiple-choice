import { getApi, postApi } from '@/lib/axios'
import {
  CreateTopicRequest,
  CreateTopicResponse,
  GetTopicsQueryParams,
  GetTopicsResponse,
} from '@/services/topics/type'

export * from './type'

export const topicService = {
  getTopicsByCourse(course_id: string | number, params?: GetTopicsQueryParams) {
    return getApi<GetTopicsResponse>(`/topic/course/${course_id}`, {
      params,
    })
  },
  createTopic(request: CreateTopicRequest) {
    return postApi<CreateTopicResponse>('/topic', request)
  },
}
