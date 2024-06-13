import { BaseApiQueryParams } from '@/lib/types/query-params'

export type ExamImage = {
  id: number
  exam_id: number
  image_name: string
  image_path: string
}

export type GetImagesQueryParams = BaseApiQueryParams

export type GetImagesResponse = {
  data: {
    images: ExamImage[]
    meta: {
      current_page: number
      next_page?: number
      prev_page?: number
      total_pages: number
      total_items: number
    }
  }
}

export type UploadExamImageRequest = {
  image: File
}

export type UploadExamImagesRequest = FormData

export type UpdateExamImageRequest = UploadExamImageRequest
