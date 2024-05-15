import { courseService } from '@/services/courses'
import { useQuery } from '@tanstack/react-query'

export const useGetCourseByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['course-by-id', id],
    queryFn: () => courseService.getCourseById(id),
  })
}
