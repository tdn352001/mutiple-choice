import { API_URL } from '@/lib/constants/api'
import { Question } from '@/services/questions'

export function getImagePath(path: string): string
export function getImagePath(image: Question): string
export function getImagePath(imageOrPath: string | Question) {
  if (typeof imageOrPath === 'string') {
    return `${API_URL}/${imageOrPath}`
  } else {
    return `${API_URL}/public/images/id_${imageOrPath.exam_id}_${imageOrPath.image}`
  }
}
