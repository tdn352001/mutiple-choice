import { useQuery } from "@tanstack/react-query";
import { BaseApiQueryParams } from "@/lib/types/query-params";
import { AppQueryOptions } from "@/lib/types/queries";
import { examService } from "@/services/exams";

const defaultParams: BaseApiQueryParams = {
  page: 1,
  per_page: 10,
};

export const useGetExamsByTopicQuery = (
  topicId: string | number,
  params: BaseApiQueryParams = defaultParams,
  options: AppQueryOptions = {},
) => {
  return useQuery({
    queryKey: ["topics-by-course", topicId, params],
    queryFn: async () => {
      return examService
        .getExamByTopic(topicId, params)
        .then((res) => res.data);
    },
    ...options,
  });
};
