import { deleteApi, getApi, postApi, putApi } from '@/lib/axios'
import {
  CreateCourseRequest,
  CreateCourseResponse,
  DeleteCourseRequest,
  GetCourseByIdResponse,
  GetCourseParams,
  GetCourseResponse,
  UpdateCourseRequest,
  UpdateCourseResponse,
} from '@/services/courses/type'

export * from './type'

export const courseService = {
  getCourses(params?: GetCourseParams) {
    console.log({ recevve: params })
    return getApi<GetCourseResponse>('/course', {
      params,
    })
  },

  getCourseById(id: string | number) {
    return getApi<GetCourseByIdResponse>(`/course/${id}`)
  },

  createCourse(request: CreateCourseRequest) {
    return postApi<CreateCourseResponse>('/course', request)
  },

  updateCourse(id: string | number, request: UpdateCourseRequest) {
    return putApi<UpdateCourseResponse>(`/course/${id}`, request)
  },

  deleteCourse(id: string | number, request?: DeleteCourseRequest) {
    return deleteApi(`/course/${id}`, {
      params: request,
    })
  },
}
