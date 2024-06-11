import { AppMutationOptions } from '@/lib/types/queries'
import { questionService } from '@/services/questions'
import { useMutation } from '@tanstack/react-query'

export const useCreateQuestionMutation = (options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: questionService.createQuestion,
    ...options,
  })
}

export const useCreateQuestionV2Mutation = (options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: questionService.createQuestionV2,
    ...options,
  })
}
