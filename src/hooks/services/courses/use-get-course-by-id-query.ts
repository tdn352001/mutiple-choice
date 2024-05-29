import { AppQueryOptions } from '@/lib/types/queries'
import { courseService } from '@/services/courses'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export const useGetCourseByIdQuery = (id: string | number, options: AppQueryOptions = {}) => {
  return useQuery({
    queryKey: ['course-by-id', id],
    queryFn: () => courseService.getCourseById(id),
    ...options,
  })
}

export const useGetCourseByIdSuspenseQuery = (id: string | number, options: AppQueryOptions = {}) => {
  return useSuspenseQuery({
    queryKey: ['course-by-id', id],
    queryFn: () => courseService.getCourseById(id),
    ...options,
  })
}
