import * as z from 'zod'

export const topicSchema = z.object({
  topic_name: z.string().min(1, 'Required field'),
  topic_code: z.string().min(1, 'Required field'),
  description: z.string().optional(),
  course_id: z.number(),
  active: z.boolean().optional(),
})

export type TopicSchema = z.infer<typeof topicSchema>
