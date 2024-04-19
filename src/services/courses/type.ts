import { BaseApiQueryParams } from '@/lib/types/query-params'

export type GetCourseSortProps = 'id' | 'name' | 'created_at' | 'updated_at'

export type GetCourseParams = BaseApiQueryParams<GetCourseSortProps>

export type RegisterRequest = {
  email: string
  password: string
  full_Name?: string
}
