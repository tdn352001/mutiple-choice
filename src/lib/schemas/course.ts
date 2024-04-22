import * as z from 'zod'

export const courseSchema = z.object({
  course_name: z.string().min(1, 'Required field'),
  course_code: z.string().min(1, 'Required field'),
  description: z.string().min(1, 'Required field'),
  active: z.boolean().optional(),
})

export type CourseSchema = z.infer<typeof courseSchema>
