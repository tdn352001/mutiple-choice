'use client'

import AnswerField from '@/components/forms/questions/answer-field'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { getImagePath } from '@/lib/get-image-path'
import { QuestionSchema, questionShema } from '@/lib/schemas/question'
import { QuestionType } from '@/lib/types/question'
import { cn } from '@/lib/utils'
import { Modals, useCloseModal, useModalData, useModalState } from '@/store/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export function ViewQuestionModal() {
  const { open, data, closeModal } = useModalState(Modals.VIEW_QUESTION)

  const question = data?.question

  const [error, setError] = useState(false)

  const handleLoadImageFailed = () => {
    setError(true)
  }

  useEffect(() => {
    setError(false)
  }, [question])

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[500px] max-h-[80dvh] lg:max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Question Detail</DialogTitle>
        </DialogHeader>
        <div>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Question</TableCell>
                <TableCell>{question?.question}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Type</TableCell>
                <TableCell className="first-letter:uppercase">{question?.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Image</TableCell>
                <TableCell>
                  {question?.image ? (
                    <div className="flex flex-col gap-1">
                      {error ? (
                        <div className="w-40 md:w-60 aspect-video bg-muted rounded-lg flex items-center justify-center px-2">
                          <p className="text-destructive text-center">
                            Load image failed. Please check if the image exists.
                          </p>
                        </div>
                      ) : (
                        <img
                          src={getImagePath(question)}
                          alt="question image"
                          className="w-40 aspect-video object-contain cursor-pointer rounded-lg"
                          onError={handleLoadImageFailed}
                        />
                      )}

                      <span>{question.image}</span>
                    </div>
                  ) : (
                    '--'
                  )}
                </TableCell>
              </TableRow>
              {question?.answer && question.answer.length > 0 && (
                <TableRow>
                  <TableCell className="font-medium">Answers</TableCell>
                  <TableCell>
                    <ol className="[list-style-type:upper-alpha] list-inside space-y-0.5">
                      {question.answer.map((answer) => (
                        <li key={answer.id} className={cn(answer.is_correct && 'text-green-600 font-semibold')}>
                          {answer.answer}
                        </li>
                      ))}
                    </ol>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <DialogFooter>
          <Button onClick={closeModal}>Close</Button>
        </DialogFooter>
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
    </>
  )
}
