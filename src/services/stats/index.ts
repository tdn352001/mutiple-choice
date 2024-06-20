import { getApi } from '@/lib/axios'
import { StatsDashboardResponse } from './type'

export * from './type'

export const statsService = {
  statsDashboard() {
    return getApi<StatsDashboardResponse>('/dashboard/count')
  },
}
