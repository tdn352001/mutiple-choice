import { API_URL } from '@/lib/constants/api'
import { HttpClient } from '@/lib/http-client'
import { sessionManager } from '@/lib/session'
import { GetCourseByIdResponse } from '@/services/courses'

export const serverHttp = new HttpClient({
  baseUrl: API_URL,
  headers: {
    Authorization: sessionManager.accessToken,
  },
})
