import { BaseApiQueryParams } from '@/lib/types/query-params'

export type GetCourseSortProps = 'id' | 'name' | 'created_at' | 'updated_at'

export type GetCourseParams = BaseApiQueryParams<GetCourseSortProps>

export type Course = {
  id: number
  course_name: string
  description: string
  active: boolean
}

export type CreateCourseRequest = {
  course_name: string
  course_code: string
  description?: string
  active?: boolean
}

export type CreateCourseResponse = {
  data: {
    course: Course
  }
}

export type UpdateCourseRequest = CreateCourseRequest

export type UpdateCourseResponse = CreateCourseResponse
