import * as z from 'zod'

export const startQuizSchema = z.object({
  password: z.string().min(1, 'Password is required'),
})

export type StartQuizSchema = z.infer<typeof startQuizSchema>
