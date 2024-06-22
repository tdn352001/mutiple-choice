import { getApi, postApi } from '@/lib/axios'
import {
  ActiveUserRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
  ResendActiveCodeRequest,
  ResetPasswordRequest,
  UpdatePasswordRequest,
} from '@/services/auth/type'

export * from './type'

export const authService = {
  login(request: LoginRequest) {
    return postApi<LoginResponse>('/login', request)
  },
  register(request: RegisterRequest) {
    return postApi('/register', request)
  },
  refreshToken() {
    return getApi<RefreshTokenResponse>('/refresh_token', {
      withCredentials: true,
    })
  },
  activeUser(request: ActiveUserRequest) {
    return postApi('/activate_user', request)
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
  updatePassword(request: UpdatePasswordRequest) {
    return postApi('/update_password', request)
  },
}
