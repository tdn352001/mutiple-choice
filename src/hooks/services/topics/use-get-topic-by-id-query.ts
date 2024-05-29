import { topicService } from '@/services/topics'
import { useQuery } from '@tanstack/react-query'

export const useGetTopicByIdQuery = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ['topic-by-id', id],
    queryFn: () => topicService.getTopicById(id),
    enabled,
  })
}
