import { AppMutationOptions } from '@/lib/types/queries'
import { topicService } from '@/services/topics'
import { useMutation } from '@tanstack/react-query'

export const useCreateTopicMutation = (options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: topicService.createTopic,
    ...options,
  })
}
