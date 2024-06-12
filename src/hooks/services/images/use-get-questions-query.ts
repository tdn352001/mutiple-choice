import { AppQueryOptions } from '@/lib/types/queries'
import { BaseApiQueryParams } from '@/lib/types/query-params'
import { imageService } from '@/services/images'
import { keepPreviousData, useQuery, useSuspenseQuery } from '@tanstack/react-query'

const defaultParams: BaseApiQueryParams = {
  page: 1,
  per_page: 10,
}

type GetImagesQuery = {
  examId: string | number
  params?: BaseApiQueryParams
}

const getQueryOptions = ({ examId, params = defaultParams }: GetImagesQuery) => {
  return {
    queryKey: ['images', examId, params],
    queryFn: async () => {
      return imageService.getImagesByExam(examId, params).then((res) => res.data)
    },
  }
}

export const useGetImagesQuery = (query: GetImagesQuery, options: AppQueryOptions = {}) => {
  return useQuery({
    ...getQueryOptions(query),
    placeholderData: keepPreviousData,
    ...options,
  })
}

export const useGetImagesSuspenseQuery = (query: GetImagesQuery, options: AppQueryOptions = {}) => {
  return useSuspenseQuery({
    ...getQueryOptions(query),
    ...options,
  })
}
