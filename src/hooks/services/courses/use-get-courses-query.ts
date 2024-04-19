import { QueryParams } from '@/lib/types/query-params'
import { useQuery } from '@tanstack/react-query'

export const useGetCoursesQuery = (params: QueryParams) => {
  return useQuery({
    queryKey: ['courses', params],
  })
}
