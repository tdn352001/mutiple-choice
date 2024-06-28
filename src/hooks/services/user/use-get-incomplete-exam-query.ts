import { AppQueryOptions } from '@/lib/types/queries'
import { userService } from '@/services/user'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export const useGetIncompleteExamsQuery = (options: AppQueryOptions = {}) => {
  return useQuery({
    queryKey: ['incomplete-exams'],
    queryFn: () => userService.getQuizNotCompleted().then((res) => res.data.map((item) => item.exam)),
    ...options,
  })
}

export const useGetIncompleteExamsSuspenseQuery = (options: AppQueryOptions = {}) => {
  return useSuspenseQuery({
    queryKey: ['incomplete-exams'],
    queryFn: () => userService.getQuizNotCompleted().then((res) => res.data),
    ...options,
  })
}
