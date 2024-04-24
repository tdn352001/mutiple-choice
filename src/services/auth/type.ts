export type User = {
  id: number
  email: string
  full_name: string
  is_admin: boolean
  active: boolean
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  data: {
    token: string
    user: User
  }
}

export type RegisterRequest = {
  email: string
  full_name: string
  password: string
}

export type ActiveUserRequest = {
  activation_code: string
  email: string
}

export type ResendActiveCodeRequest = {
  email: string
}

export type UpdatePasswordRequest = {
  old_password: string
  new_password: string
}

export type ForgotPasswordRequest = {
  email: string
}

export type ResetPasswordRequest = {
  email: string
  activation_code: string
  password: string
  confirm_password: string
}
