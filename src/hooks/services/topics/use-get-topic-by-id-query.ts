import { AppQueryOptions } from '@/lib/types/queries'
import { topicService } from '@/services/topics'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export const useGetTopicByIdQuery = (id: string | number, options: AppQueryOptions = {}) => {
  return useQuery({
    queryKey: ['topic', id],
    queryFn: () => topicService.getTopicById(id),
    ...options,
  })
}

export const useGetTopicByIdSuspenseQuery = (id: string | number, options: AppQueryOptions = {}) => {
  return useSuspenseQuery({
    queryKey: ['topic', id],
    queryFn: () => topicService.getTopicById(id),
    ...options,
  })
}
