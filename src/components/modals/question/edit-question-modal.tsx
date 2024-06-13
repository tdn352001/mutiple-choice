'use client'

import AnswerField from '@/components/forms/questions/answer-field'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateAnswerMutation, useUpdateQuestionMutation } from '@/hooks/services/questions'
import { QuestionSchema, questionShema } from '@/lib/schemas/question'
import { questionService } from '@/services/questions'
import { Modals, useCloseModal, useModalData, useModalState } from '@/store/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import lodash from 'lodash'
import PQueue from 'p-queue'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
export function EditQuestionModal() {
  const { open, closeModal } = useModalState(Modals.EDIT_QUESTION)

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px] max-h-[80dvh] lg:max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
        </DialogHeader>
        <EditQuestionForm />
      </DialogContent>
    </Dialog>
  )
}

type FormValue = QuestionSchema

const EditQuestionForm = () => {
  const { question } = useModalData(Modals.EDIT_QUESTION)
  const closeModal = useCloseModal(Modals.EDIT_QUESTION)

  const [isPending, setIsPending] = useState(false)
  const form = useForm<FormValue>({
    resolver: zodResolver(questionShema),
    defaultValues: question,
  })

  const { mutateAsync: updateQuestion } = useUpdateQuestionMutation(question.id)
  const { mutateAsync: createAnswer } = useCreateAnswerMutation(question.id)

  const queryClient = useQueryClient()

  const handleFormSubmit = async (formValue: FormValue) => {
    try {
      setIsPending(true)
      if (question.question !== formValue.question || question.image !== formValue.image) {
        await updateQuestion({
          exam_id: question.exam_id,
          type: question.type,
          question: formValue.question,
          image: formValue.image,
        })
      }

      const newAnswer = formValue.answer
      const oldAnswer = question.answer
      const checkedAnswer: Record<string, any> = {}
      const queue = new PQueue({ concurrency: 3, autoStart: false })

      if (newAnswer && newAnswer.length) {
        for (const ans of newAnswer) {
          if (ans.id) {
            const originAnswer = question.answer.find((a) => a.id === ans.id)
            if (originAnswer) {
              checkedAnswer[originAnswer.id] = true
              if (!lodash.isEqual(originAnswer, ans)) {
                queue.add(() =>
                  questionService.updateAnswer(ans?.id!, {
                    answer: ans.answer,
                    is_correct: ans.is_correct,
                  })
                )
              }
            }
          } else {
            // create answer
            queue.add(() =>
              createAnswer({
                answer: ans.answer,
                is_correct: ans.is_correct,
              })
            )
          }
        }
      }

      if (oldAnswer && oldAnswer.length) {
        for (const ans of oldAnswer) {
          if (!checkedAnswer[ans.id]) {
            queue.add(() => questionService.deleteAnswer(ans.id), {
              priority: 10,
            })
          }
        }
      }

      if (queue.size) {
        const { promise, resolve } = Promise.withResolvers()
        queue.onIdle().then(resolve)
        queue.start()
        await promise
      }
      toast.success('Question updated successfully')
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setIsPending(false)
      queryClient.invalidateQueries({
        queryKey: [
          'questions',
          {
            examId: question.exam_id,
          },
        ],
      })
    }
  }

  return (
    <>
      <div>
        <Form {...form}>
          <form id="edit-question" className="space-y-3 w-full" onSubmit={form.handleSubmit(handleFormSubmit)}>
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your question here..." className="resize-none" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AnswerField form={form} />
          </form>
        </Form>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={closeModal} disabled={isPending}>
          Cancel
        </Button>
        <Button form="edit-question" disabled={isPending}>
          Submit
        </Button>
      </DialogFooter>
    </>
  )
}
