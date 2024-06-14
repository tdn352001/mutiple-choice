import { BaseApiResponse } from '@/lib/axios'
import { BaseApiQueryParams } from '@/lib/types/query-params'
import { User } from '@/services/auth'

export type Member = User

export type GetMemberParams = BaseApiQueryParams

export type GetMemberResponseData = {
  users: Member[]
  meta: {
    current_page: number
    next_page?: number
    prev_page?: number
    total_pages: number
    total_items: number
  }
}

export type GetMemberResponse = BaseApiResponse<GetMemberResponseData>

export type UpdateMemberInfoRequest = {
  full_name: string
  is_admin: boolean
  active: boolean
}

export type UpdateMemberPasswordRequest = {
  password: string
}
