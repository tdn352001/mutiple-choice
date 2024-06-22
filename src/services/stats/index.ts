import { getApi } from '@/lib/axios'
import { GetUserByExamHistoryParams, GetUserByExamHistoryResponse, StatsDashboardResponse } from './type'

export * from './type'

export const statsService = {
  statsDashboard() {
    return getApi<StatsDashboardResponse>('/dashboard/count')
  },

  getUserByExamHistory(id: string | number, params?: GetUserByExamHistoryParams) {
    return getApi<GetUserByExamHistoryResponse>(`/admin/get_list_user_by_exam/${id}`, { params })
  },
}
