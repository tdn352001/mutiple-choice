import { API_URL } from '@/lib/constants/api'

type ImageInfo = {
  exam_id: number | string
  image?: string
}

export function getImagePath(path: string): string
export function getImagePath(image: ImageInfo): string
export function getImagePath(imageOrPath: string | ImageInfo) {
  if (typeof imageOrPath === 'string') {
    return `${API_URL}/${imageOrPath}`
  } else {
    return `${API_URL}/public/images/id_${imageOrPath.exam_id}_${imageOrPath.image}`
  }
}
