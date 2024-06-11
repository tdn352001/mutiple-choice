import { QuestionType } from '@/lib/types/question'
import * as z from 'zod'

export const answerShema = z.object({
  id: z.number().optional(),
  answer: z.string(),
  is_correct: z.boolean(),
})

export const questionShema = z
  .object({
    exam_id: z.number(),
    question: z.string().min(1, 'Required field'),
    type: z.string(),
    image: z.string().optional(),
    answer: z.array(answerShema).optional(),
  })
  .refine(
    (data) => {
      if (data.type !== QuestionType.Essay) {
        return data.answer && data.answer.length > 0
      }
      return true
    },
    {
      message: 'Answer is required',
      path: ['answer'],
    }
  )
  .refine(
    (data) => {
      if (data.type === QuestionType.Normal) {
        return data.answer && data.answer.length > 2
      }
      return true
    },
    {
      message: 'Minimum 3 answers required for normal question',
      path: ['answer'],
    }
  )
  .refine(
    (data) => {
      if (data.type === QuestionType.Multiple) {
        return data.answer && data.answer.length > 1
      }
      return true
    },
    {
      message: 'Minimum 2 answers required for multiple question',
      path: ['answer'],
    }
  )
  .refine(
    (data) => {
      if (data.type !== QuestionType.Normal) {
        //  check answer is not empty
        return data.answer?.every((ans) => ans.answer.length > 0)
      }
      return true
    },
    {
      message: 'Answer cannot be empty',
      path: ['answer'],
    }
  )
  .refine(
    (data) => {
      // check answer is unique
      const answer = data.answer!.map((ans) => ans.answer)
      return new Set(answer).size === answer.length
    },
    {
      message: 'Answer must be unique',
      path: ['answer'],
    }
  )
  .refine(
    (data) => {
      if (data.type !== QuestionType.Essay) {
        return data.answer?.some((ans) => ans.is_correct)
      }
      return true
    },
    {
      message: 'No correct answer selected',
      path: ['answer'],
    }
  )

export type AnswerSchema = z.infer<typeof answerShema>
export type QuestionSchema = z.infer<typeof questionShema>
