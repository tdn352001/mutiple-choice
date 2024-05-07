import { BaseApiQueryParams } from '@/lib/types/query-params'
import { courseService } from '@/services/courses'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export const useGetCoursesQuery = (params: BaseApiQueryParams) => {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: async () => {
      return courseService
        .getCourses(params)
        .then((res) => res.data)
        .catch(() => {
          return {
            courses: [],
            meta: {
              total_items: 0,
            },
          }
        })
    },
  })
}

export const useGetCoursesSuspenseQuery = (params: BaseApiQueryParams) => {
  return useSuspenseQuery({
    queryKey: ['courses', params],
    queryFn: async () => {
      return courseService
        .getCourses(params)
        .then((res) => res.data)
        .catch(() => {
          return {
            courses: [],
            meta: {
              total_items: 0,
            },
          }
        })
    },
  })
}
