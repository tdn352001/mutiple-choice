import { AppMutationOptions } from "@/lib/types/queries";
import { useMutation } from "@tanstack/react-query";
import { questionService, UpdateAnswerRequest } from "@/services/questions";

export const useUpdateAnswerMutation = (
  id: string | number,
  options: AppMutationOptions = {},
) => {
  return useMutation({
    mutationFn: async (request: UpdateAnswerRequest) => {
      return questionService.updateAnswer(id, request);
    },
    ...options,
  });
};
