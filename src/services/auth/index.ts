import { postApi } from '@/lib/axios'
import {
  ActiveUserRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ResendActiveCodeRequest,
  ResetPasswordRequest,
} from '@/services/auth/type'

export * from './type'

export const authService = {
  login(request: LoginRequest) {
    return postApi<LoginResponse>('/login', request)
  },
  register(request: RegisterRequest) {
    return postApi('/register', request)
  },

  activeUser(request: ActiveUserRequest) {
    return postApi('/activation_code', request)
  },
  resendActiveCode(request: ResendActiveCodeRequest) {
    return postApi('/resend_activation_code', request)
  },
  forgotPassword(request: ForgotPasswordRequest) {
    return postApi('/forgot_password', request)
  },
  resetPassword(request: ResetPasswordRequest) {
    return postApi('/reset_password', request)
  },
}
