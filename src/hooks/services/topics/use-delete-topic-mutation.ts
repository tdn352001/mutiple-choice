import { AppMutationOptions } from "@/lib/types/queries";
import { useMutation } from "@tanstack/react-query";
import { topicService } from "@/services/topics";

export const useDeleteTopicMutation = (options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: topicService.deleteTopic,
    ...options,
  });
};
