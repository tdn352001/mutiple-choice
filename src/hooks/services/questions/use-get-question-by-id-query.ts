import { AppQueryOptions } from "@/lib/types/queries";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { questionService } from "@/services/questions";

export const useGetQuestionByIdQuery = (
  id: string,
  options: AppQueryOptions = {},
) => {
  return useQuery({
    queryKey: ["question", id],
    queryFn: () => questionService.getQuestionById(id),
    ...options,
  });
};

export const useGetQuestionByIdSuspenseQuery = (
  id: string,
  options: AppQueryOptions = {},
) => {
  return useSuspenseQuery({
    queryKey: ["question", id],
    queryFn: () => questionService.getQuestionById(id),
    ...options,
  });
};
