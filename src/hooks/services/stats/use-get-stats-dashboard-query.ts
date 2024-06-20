import { AppQueryOptions } from '@/lib/types/queries'
import { statsService } from '@/services/stats'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export const useGetStatsDashboardQuery = (options: AppQueryOptions = {}) => {
  return useQuery({
    queryKey: ['stats', 'dashboard'],
    queryFn: async () => {
      return statsService.statsDashboard().then((res) => res.data)
    },
    ...options,
  })
}

export const useGetStatsDashboardSuspenseQuery = (options: AppQueryOptions = {}) => {
  return useSuspenseQuery({
    queryKey: ['stats', 'dashboard'],
    queryFn: async () => {
      return statsService.statsDashboard().then((res) => res.data)
    },
    ...options,
  })
}
