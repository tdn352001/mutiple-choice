import { postApi } from '@/lib/axios'
import { LoginRequest, RegisterRequest } from '@/services/auth/type'

export * from './type'

export const authService = {
  login(request: LoginRequest) {
    return postApi('/user/token', request)
  },
  register(request: RegisterRequest) {
    return postApi('/user/create_user', request)
  },
}
