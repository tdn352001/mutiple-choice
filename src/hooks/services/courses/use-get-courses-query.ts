import { AppQueryOptions } from '@/lib/types/queries'
import { BaseApiQueryParams } from '@/lib/types/query-params'
import { Course, GetCourseResponse, courseService } from '@/services/courses'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

const defaultParams: BaseApiQueryParams = {
  page: 1,
  per_page: 10,
}

export const useGetCoursesQuery = (params: BaseApiQueryParams = defaultParams, options: AppQueryOptions = {}) => {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: async () => {
      console.log({ queryData: params })
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
