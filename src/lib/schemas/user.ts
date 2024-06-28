import * as z from 'zod'

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
})

export const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, 'Password is required').max(32),
    new_password: z
      .string()
      .min(4, 'Password must be at least 4 characters')
      .max(32, 'Password must be at most 32 characters'),
    confirm_password: z
      .string()
      .min(4, 'Password must be at least 4 characters')
      .max(32, 'Password must be at most 32 characters'),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  })

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>
