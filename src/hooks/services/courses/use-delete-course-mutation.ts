import { AppMutationOptions } from '@/lib/types/queries'
import { DeleteCourseRequest, courseService } from '@/services/courses'
import { useMutation } from '@tanstack/react-query'

export const useDeleteCourseMutation = (id: string, options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: async (request?: DeleteCourseRequest) => {
      if (!id) throw new Error('Id is required')

      return courseService.deleteCourse(id, request)
    },
    ...options,
  })
}
