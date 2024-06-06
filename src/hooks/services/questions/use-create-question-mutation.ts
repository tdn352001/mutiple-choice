import { AppMutationOptions } from "@/lib/types/queries";
import { useMutation } from "@tanstack/react-query";
import { questionService } from "@/services/questions";

export const useCreateQuestionMutation = (options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: questionService.createQuestion,
    ...options,
  });
};
