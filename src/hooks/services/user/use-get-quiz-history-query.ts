import { AppQueryOptions } from '@/lib/types/queries'
import { userService } from '@/services/user'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export const useGetQuizHistoryQuery = (examId: string | number, options: AppQueryOptions = {}) => {
  return useQuery({
    queryKey: ['quiz-history', examId],
    queryFn: () => userService.getQuizHistory({ exam_id: examId }).then((res) => res.data),
    staleTime: 2 * 60 * 1000,
    ...options,
  })
}

export const useGetQuizHistorySuspenseQuery = (examId: string | number, options: AppQueryOptions = {}) => {
  return useSuspenseQuery({
    queryKey: ['quiz-history', examId],
    queryFn: () => userService.getQuizHistory({ exam_id: examId }).then((res) => res.data),
    staleTime: 2 * 60 * 1000,
    ...options,
  })
}
