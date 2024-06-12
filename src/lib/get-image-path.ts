import { API_URL } from '@/lib/constants/api'

export const getImagePath = (path: string) => {
  return `${API_URL}/${path}`
}
