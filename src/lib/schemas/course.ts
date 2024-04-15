import { format } from 'path'
import * as z from 'zod'

export const courseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  shorthand: z.string().optional(),
  format: z.string(),
  language: z.string(),
  quantity: z.number(),
})

export type CourseSchema = z.infer<typeof courseSchema>
