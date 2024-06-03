import { AppQueryOptions } from '@/lib/types/queries'
import { examService } from '@/services/exams'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export const useGetExamByIdQuery = (id: string, options: AppQueryOptions = {}) => {
  return useQuery({
    queryKey: ['exam', id],
    queryFn: () => examService.getExamById(id),
    ...options,
  })
}

export const useGetExamByIdSuspenseQuery = (id: string, options: AppQueryOptions = {}) => {
  return useSuspenseQuery({
    queryKey: ['exam', id],
    queryFn: () => examService.getExamById(id),
    ...options,
  })
}
