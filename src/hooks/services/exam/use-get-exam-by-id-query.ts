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

export const useGetExamForEditQuery = (id: string, options: AppQueryOptions = {}) => {
  return useQuery({
    queryKey: ['exam', id],
    queryFn: () => examService.getExamForEdit(id),
    ...options,
  })
}

export const useGetExamForEditSuspenseQuery = (id: string, options: AppQueryOptions = {}) => {
  return useSuspenseQuery({
    queryKey: ['exam', id],
    queryFn: () => examService.getExamForEdit(id),
    ...options,
  })
}

export const useGetExamByIdV2Query = (id: string, options: AppQueryOptions = {}) => {
  return useQuery({
    queryKey: ['exam-v2', id],
    queryFn: () => examService.getExamByIdV2(id).then((res) => res.data),
    ...options,
  })
}

export const useGetExamByIdV2SuspenseQuery = (id: string, options: AppQueryOptions = {}) => {
  return useSuspenseQuery({
    queryKey: ['exam-v2', id],
    queryFn: () => examService.getExamByIdV2(id).then((res) => res.data),
    ...options,
  })
}
