import { courseService } from '@/services/courses'
import { useQuery } from '@tanstack/react-query'

export const useGetCourseByIdQuuery = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => courseService.getCourseById(id),
  })
}
