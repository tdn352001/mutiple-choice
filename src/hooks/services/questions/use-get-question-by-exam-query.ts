import { AppQueryOptions } from "@/lib/types/queries";
import { BaseApiQueryParams } from "@/lib/types/query-params";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { questionService } from "@/services/questions";

const defaultParams: BaseApiQueryParams = {
  page: 1,
  per_page: 10,
};

export const useGetQuestionsByExamQuery = (
  examId: string | number,
  params: BaseApiQueryParams = defaultParams,
  options: AppQueryOptions = {},
) => {
  return useQuery({
    queryKey: ["question-by-exam", examId, params],
    queryFn: async () => {
      return questionService
        .getQuestionsByExam(examId, params)
        .then((res) => res.data);
    },
    ...options,
  });
};

export const useGetQuestionsByExamSuspenseQuery = (
  examId: string | number,
  params: BaseApiQueryParams = defaultParams,
  options: AppQueryOptions = {},
) => {
  return useSuspenseQuery({
    queryKey: ["question-by-exam", examId, params],
    queryFn: async () => {
      return questionService
        .getQuestionsByExam(examId, params)
        .then((res) => res.data);
    },
    ...options,
  });
};
