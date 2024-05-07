import { getApi, postApi, putApi } from '@/lib/axios'
import {
  CreateCourseRequest,
  CreateCourseResponse,
  GetCourseParams,
  GetCourseResponse,
  UpdateCourseRequest,
  UpdateCourseResponse,
} from '@/services/courses/type'

export * from './type'

export const courseService = {
  getCourses(params?: GetCourseParams) {
    return getApi<GetCourseResponse>('/course', {
      params,
    })
  },
  createCourse(request: CreateCourseRequest) {
    return postApi<CreateCourseResponse>('/course', request)
  },

  updateCourse(id: string, request: UpdateCourseRequest) {
    return putApi<UpdateCourseResponse>(`/course/${id}`, request)
  },
}
