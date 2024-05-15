import { getApi, postApi, putApi, deleteApi } from '@/lib/axios'
import {
  GetImagesResponse,
  UploadExamImageRequest,
  UploadExamImageResponse,
  UpdateExamImageRequest,
  UpdateExamImageResponse,
} from './type'

export * from './type'

export const imageService = {
  getImagesByExam(exam_id: string | number) {
    return getApi<GetImagesResponse>(`/image/exam/${exam_id}`)
  },

  uploadImages(exam_id: number, request: UploadExamImageRequest) {
    return postApi<UploadExamImageResponse>(`/image/exam/${exam_id}`, request)
  },

  updateImage(id: string | number, request: UpdateExamImageRequest) {
    return putApi<UpdateExamImageResponse>(`/image/${id}`, request)
  },

  deleteImage(id: string | number) {
    return deleteApi(`/image/${id}`)
  },
}
