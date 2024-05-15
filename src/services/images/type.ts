import { BaseApiQueryParams } from '@/lib/types/query-params'

export type ExamImage = {
  id: number
  exam_id: number
  image_name: string
  image_path: string
}

export type GetImagesResponse = {
  data: ExamImage[]
}

export type UploadExamImageRequest = {
  images: File[]
}

export type UploadExamImageResponse = {
  data: ExamImage
}

export type UpdateExamImageRequest = UploadExamImageRequest

export type UpdateExamImageResponse = UploadExamImageResponse
