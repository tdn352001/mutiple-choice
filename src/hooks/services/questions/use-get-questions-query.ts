import { AppQueryOptions } from "@/lib/types/queries";
import { BaseApiQueryParams } from "@/lib/types/query-params";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { questionService } from "@/services/questions";

const defaultParams: BaseApiQueryParams = {
  page: 1,
  per_page: 10,
};

type GetQuestionsQuery = {
  examId?: string | number;
  params?: BaseApiQueryParams;
};

const getQueryOptions = ({
  examId,
  params = defaultParams,
}: GetQuestionsQuery) => {
  const queryKey = examId
    ? ["questions", { examId }, params]
    : ["exams", params];
  return {
    queryKey,
    queryFn: async () => {
      if (examId) {
        return questionService
          .getQuestionsByExam(examId, params)
          .then((res) => res.data);
      }

      return questionService.getQuestions(params).then((res) => res.data);
    },
  };
};

export const useGetQuestionsQuery = (
  query: GetQuestionsQuery,
  options: AppQueryOptions = {},
) => {
  return useQuery({
    ...getQueryOptions(query),
    ...options,
  });
};

export const useGetQuestionsSuspenseQuery = (
  query: GetQuestionsQuery,
  options: AppQueryOptions = {},
) => {
  return useSuspenseQuery({
    ...getQueryOptions(query),
    ...options,
  });
};
