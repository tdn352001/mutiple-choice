'use client'

import AnswerField from '@/components/forms/questions/answer-field'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { QuestionSchema, questionShema } from '@/lib/schemas/question'
import { QuestionType } from '@/lib/types/question'
import { Modals, useCloseModal, useModalData, useModalState } from '@/store/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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

  const form = useForm<FormValue>({
    resolver: zodResolver(questionShema),
    defaultValues: question,
  })

  console.log({ question })

  const handleFormSubmit = async (formValue: FormValue) => {}

  return (
    <>
      <div>
        <Form {...form}>
          <form id="edit-question" className="space-y-3 w-full" onSubmit={form.handleSubmit(handleFormSubmit)}>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={(...e) => {
                      field.onChange(...e)
                      form.setValue('answer', [])
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type of question" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={QuestionType.Normal}>Normal</SelectItem>
                      <SelectItem value={QuestionType.Multiple}>Multiple Selection</SelectItem>
                      <SelectItem value={QuestionType.Essay}>Essay</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button form="edit-question">Submit</Button>
      </DialogFooter>
    </>
  )
}
