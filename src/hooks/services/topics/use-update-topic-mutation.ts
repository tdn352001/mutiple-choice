import { AppMutationOptions } from "@/lib/types/queries";
import { topicService, UpdateTopicRequest } from "@/services/topics";
import { useMutation } from "@tanstack/react-query";

export const useUpdateTopicMutation = (
  id: string | number,
  options: AppMutationOptions = {},
) => {
  return useMutation({
    mutationFn: async (request: UpdateTopicRequest) => {
      return topicService.updateTopic(id, request);
    },
    ...options,
  });
};
