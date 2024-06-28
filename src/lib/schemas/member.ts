import * as z from 'zod'

export const updateMemberPasswordSchema = z
  .object({
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

export const updateMemberProfileSchema = z.object({
  full_name: z.string().min(1, { message: 'Name is required' }),
  is_admin: z.boolean(),
  active: z.boolean(),
})

export const addMemberSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  full_name: z.string().min(1, { message: 'Name is required' }),
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters')
    .max(32, 'Password must be at most 32 characters'),
  is_admin: z.boolean(),
  active: z.boolean(),
})

export type UpdateMemberPasswordSchema = z.infer<typeof updateMemberPasswordSchema>
export type UpdateMemberProfileSchema = z.infer<typeof updateMemberProfileSchema>
export type AddMemberSchema = z.infer<typeof addMemberSchema>
