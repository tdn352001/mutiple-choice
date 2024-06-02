import { topicService } from '@/services/topics'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export const useGetTopicByIdQuery = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ['topic-by-id', id],
    queryFn: () => topicService.getTopicById(id),
    enabled,
  })
}

export const useGetTopicByIdSuspenseQuery = (id: string, enabled = true) => {
  return useSuspenseQuery({
    queryKey: ['topic', id],
    queryFn: () => topicService.getTopicById(id),
  })
}
