import { AppMutationOptions } from '@/lib/types/queries'
import { courseService } from '@/services/courses'
import { useMutation } from '@tanstack/react-query'

export const useCreateCourseMutation = (options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: courseService.createCourse,
    ...options,
  })
}
