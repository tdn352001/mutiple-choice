import { AppQueryOptions } from '@/lib/types/queries'
import { topicService } from '@/services/topics'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export const useGetTopicByIdQuery = (id: string, options: AppQueryOptions = {}) => {
  return useQuery({
    queryKey: ['topic-by-id', id],
    queryFn: () => topicService.getTopicById(id),
    ...options,
  })
}

export const useGetTopicByIdSuspenseQuery = (id: string, options: AppQueryOptions = {}) => {
  return useSuspenseQuery({
    queryKey: ['topic', id],
    queryFn: () => topicService.getTopicById(id),
    ...options,
  })
}
