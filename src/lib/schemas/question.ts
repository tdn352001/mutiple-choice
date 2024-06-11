import * as z from 'zod'

export const answerShema = z.object({
  id: z.number().optional(),
  answer: z.string(),
  is_correct: z.boolean().optional(),
})

export const questionShema = z.object({
  exam_id: z.number(),
  question: z.string().min(1, 'Required field'),
  exam_code: z.string().min(1, 'Required field'),
  type: z.string(),
  image: z.string().optional(),
  answer: z.array(answerShema).optional(),
})

export type AnswerSchema = z.infer<typeof answerShema>
export type QuestionSchema = z.infer<typeof questionShema>
