export type LoginRequest = {
  username: string
  password: string
}

export type RegisterRequest = {
  email: string
  password: string
  full_Name?: string
}
