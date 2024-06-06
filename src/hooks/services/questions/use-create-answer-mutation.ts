import { AppMutationOptions } from "@/lib/types/queries";
import { useMutation } from "@tanstack/react-query";
import { CreateAnswerRequest, questionService } from "@/services/questions";

export const useCreateAnswerMutation = (
  questionId: string | number,
  options: AppMutationOptions = {},
) => {
  return useMutation({
    mutationFn: (request: CreateAnswerRequest) => {
      return questionService.createAnswer(questionId, request);
    },
    ...options,
  });
};
