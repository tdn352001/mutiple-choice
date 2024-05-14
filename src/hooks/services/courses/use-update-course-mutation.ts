import { AppMutationOptions } from '@/lib/types/queries'
import { UpdateCourseRequest, courseService } from '@/services/courses'
import { useMutation } from '@tanstack/react-query'

export const useUpdateCourseMutation = (id: string | number, options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: async (request: UpdateCourseRequest) => {
      if (!id) throw new Error('Id is required')

      return courseService.updateCourse(id, request)
    },
    ...options,
  })
}
