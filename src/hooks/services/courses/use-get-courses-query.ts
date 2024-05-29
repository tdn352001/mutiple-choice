import { AppQueryOptionsV2 } from '@/lib/types/queries'
import { BaseApiQueryParams } from '@/lib/types/query-params'
import { GetCourseResponse, GetCourseResponseData, courseService } from '@/services/courses'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

const defaultParams: BaseApiQueryParams = {
  page: 1,
  per_page: 10,
}

type UseGetCoursesQuery = AppQueryOptionsV2<
  GetCourseResponseData,
  Error,
  GetCourseResponseData,
  (string | BaseApiQueryParams)[]
>

export const useGetCoursesQuery = (params: BaseApiQueryParams = defaultParams, options: UseGetCoursesQuery = {}) => {
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

export const useGetCoursesSuspenseQuery = (
  params: BaseApiQueryParams = defaultParams,
  options: UseGetCoursesQuery = {}
) => {
  return useSuspenseQuery({
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
