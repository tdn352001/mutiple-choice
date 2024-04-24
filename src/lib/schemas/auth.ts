import * as z from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email is not valid' }),
  password: z.string().min(1, 'Password is required'),
})

export const registerSchema = z
  .object({
    email: z.string().email({ message: 'Email is not valid' }),
    full_name: z.string().min(1, { message: 'Name is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  })

export const verifyAccountSchema = z.object({
  activation_code: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Email is not valid' }),
})

export const resetPasswordSchema = z
  .object({
    activation_code: z.string().min(6, {
      message: 'Your one-time password must be 6 characters.',
    }),
    password: z.string().min(1, { message: 'Password is required' }),
    confirm_password: z.string().min(1, { message: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  })

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>
export type VerifyAccountSchema = z.infer<typeof verifyAccountSchema>
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
