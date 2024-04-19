import { getApi } from '@/lib/axios'
import { GetCourseParams } from '@/services/courses/type'

export * from './type'

export const courseService = {
  getCourses(params?: GetCourseParams) {
    return getApi('/course', {
      params,
    })
  },
}
