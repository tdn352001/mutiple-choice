import { AppQueryOptions } from '@/lib/types/queries'
import { BaseApiQueryParams } from '@/lib/types/query-params'
import { Course, GetCourseResponse, courseService } from '@/services/courses'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

const defaultParams: BaseApiQueryParams = {
  page: 1,
  per_page: 10,
}

export const useGetCoursesQuery = (
  params: BaseApiQueryParams = defaultParams,
  options: AppQueryOptions<
    {
      courses: Course[]
      meta: {
        current_page: number
        next_page?: number | undefined
        prev_page?: number | undefined
        total_pages: number
        total_items: number
      }
    },
    Error,
    {
      courses: Course[]
      meta: {
        current_page: number
        next_page?: number | undefined
        prev_page?: number | undefined
        total_pages: number
        total_items: number
      }
    },
    (string | BaseApiQueryParams)[]
  > = {}
) => {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: async () => {
      return courseService
        .getCourses(params)
        .then((res) => res.data)
        .catch((): GetCourseResponse['data'] => {
          return {
            courses: [],
            meta: {
              current_page: 1,
              total_pages: 0,
              total_items: 0,
            },
          }
        })
    },
    ...options,
  })
}

export const useGetCoursesSuspenseQuery = (params: BaseApiQueryParams = defaultParams) => {
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
