import { BaseApiResponse } from '@/lib/axios'
import { BaseApiQueryParams } from '@/lib/types/query-params'

export type Topic = {
  id: number
  course_id: number
  topic_name: string
  topic_code: string
  description: string
  active: boolean
}

export type GetTopicsQueryParams = BaseApiQueryParams

export type GetTopicsResponseData = {
  topics: Topic[]
  meta: {
    current_page: number
    next_page?: number
    prev_page?: number
    total_pages: number
    total_items: number
  }
}
export type GetTopicsResponse = BaseApiResponse<GetTopicsResponseData>

export type CreateTopicRequest = {
  course_id: string | number
  topic_name: string
  topic_code: string
  description?: string
  active?: boolean
}

export type CreateTopicResponse = {
  data: Topic
}

export type UpdateTopicRequest = Omit<CreateTopicRequest, 'course_id'>

export type UpdateTopicResponse = CreateTopicResponse

export type GetTopicByIdResponse = {
  data: Topic
}
