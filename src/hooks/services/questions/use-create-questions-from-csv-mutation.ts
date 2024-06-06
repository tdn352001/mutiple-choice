import { AppMutationOptions } from "@/lib/types/queries";
import { useMutation } from "@tanstack/react-query";
import {
  CreateQuestionFromCsvRequest,
  questionService,
} from "@/services/questions";

export const useCreateQuestionsFromCsvMutation = (
  examId: string | number,
  options: AppMutationOptions = {},
) => {
  return useMutation({
    mutationFn: (request: CreateQuestionFromCsvRequest) => {
      return questionService.createQuestionFromCsv(examId, request);
    },
    ...options,
  });
};
