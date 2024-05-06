import { getApi, postApi, putApi } from '@/lib/axios'
import {
  CreateCourseRequest,
  CreateCourseResponse,
  GetCourseParams,
  UpdateCourseRequest,
  UpdateCourseResponse,
} from '@/services/courses/type'

export * from './type'

export const courseService = {
  getCourses(params?: GetCourseParams) {
    return getApi('/course', {
      params,
    })
  },
  createCourse(request: CreateCourseRequest) {
    return postApi<CreateCourseResponse>('/course/create_course', request)
  },

  updateCourse(id: string, request: UpdateCourseRequest) {
    return putApi<UpdateCourseResponse>(`/course/${id}`, request)
  },
}
