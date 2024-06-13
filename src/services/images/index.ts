import { deleteApi, getApi, postApi, putFormApi } from '@/lib/axios'
import { GetImagesQueryParams, GetImagesResponse, UpdateExamImageRequest, UploadExamImagesRequest } from './type'

export * from './type'

export const imageService = {
  getImagesByExam(exam_id: string | number, params?: GetImagesQueryParams) {
    return getApi<GetImagesResponse>(`/image/exam/${exam_id}`, { params })
  },

  uploadImages(exam_id: string | number, request: UploadExamImagesRequest) {
    console.log({ request })
    return postApi(`/image/exam/list_image/${exam_id}`, request, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  updateImage(id: string | number, request: UpdateExamImageRequest) {
    return putFormApi(`/image/${id}`, request)
  },

  deleteImage(id: string | number) {
    return deleteApi(`/image/${id}`)
  },
}
