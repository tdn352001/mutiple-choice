import { AppMutationOptions } from "@/lib/types/queries";
import { useMutation } from "@tanstack/react-query";
import { questionService, UpdateQuestionRequest } from "@/services/questions";

export const useUpdateQuestionMutation = (
  id: string | number,
  options: AppMutationOptions = {},
) => {
  return useMutation({
    mutationFn: async (request: UpdateQuestionRequest) => {
      return questionService.updateQuestion(id, request);
    },
    ...options,
  });
};
