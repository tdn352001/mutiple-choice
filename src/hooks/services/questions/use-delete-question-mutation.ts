import { AppMutationOptions } from "@/lib/types/queries";
import { useMutation } from "@tanstack/react-query";
import { questionService } from "@/services/questions";

export const useDeleteQuestionMutation = (options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: questionService.deleteQuestion,
    ...options,
  });
};
