import * as z from 'zod'

export const examSchema = z
  .object({
    course_id: z.number(),
    topic_id: z.number(),
    exam_name: z.string().min(1, 'Required field'),
    exam_code: z.string().min(1, 'Required field'),
    description: z.string().optional(),
    number_of_questions: z.coerce
      .number({
        invalid_type_error: 'Number of questions must be an integer number',
      })
      .int()
      .min(1, 'Number of questions must be at least 1'),
    number_attempts: z.coerce
      .number({
        invalid_type_error: 'Number of attempts must be an integer number',
      })
      .int()
      .min(1, 'Number of attempts must be at least 1'),
    time_limit: z.coerce
      .number({
        invalid_type_error: 'Time limit must be an integer number',
      })
      .int()
      .min(1, 'Time limit must be at least 1'),
    protect: z.boolean(),
    password: z.string().optional(),
    onsite_scoring: z.boolean(),
    show_answer: z.boolean().optional(),
    active: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.protect) {
        return data.password?.length
      }

      return true
    },
    {
      message: 'Password is required',
      path: ['password'],
    }
  )

export type ExamSchema = z.infer<typeof examSchema>
