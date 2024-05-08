import { BaseApiQueryParams } from '@/lib/types/query-params'

export type Course = {
  id: number
  course_name: string
  description: string
  active: boolean
}

export type GetCourseParams = BaseApiQueryParams

export type GetCourseResponse = {
  data: {
    courses: Course[]
    meta: {
      current_page: number
      next_page?: number
      prev_page?: number
      total_pages: number
      total_items: number
    }
  }
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

export type DeleteCourseRequest = {
  new_course_id: string
}
