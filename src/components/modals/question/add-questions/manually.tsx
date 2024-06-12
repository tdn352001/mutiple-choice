import AnswerField from '@/components/forms/questions/answer-field'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCreateQuestionV2Mutation } from '@/hooks/services/questions'
import { QuestionSchema, questionShema } from '@/lib/schemas/question'
import { QuestionType } from '@/lib/types/question'
import { Modals, useCloseModal, useModalData } from '@/store/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormValue = QuestionSchema

const AddQuestionManually = () => {
  const closeModal = useCloseModal(Modals.ADD_QUESTION)

  const { examId } = useModalData(Modals.ADD_QUESTION)

  const form = useForm<FormValue>({
    resolver: zodResolver(questionShema),
    defaultValues: {
      type: QuestionType.Normal,
      question: '',
      image: '',
      exam_id: Number(examId),
    },
  })

  const queryClient = useQueryClient()

  const { mutateAsync: createQuestion, isPending } = useCreateQuestionV2Mutation()

  const handleFormSubmit = async (formValue: FormValue) => {
    return createQuestion(formValue)
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ['questions', { examId }],
        })
        closeModal()
        toast.success('Question added successfully')
      })
      .catch((err) => {
        toast.error(err.message || 'Something went wrong. Please try again later.')
      })
  }

  return (
    <>
      <div>
        <Form {...form}>
          <form id="create-question" className="space-y-3 w-full" onSubmit={form.handleSubmit(handleFormSubmit)}>
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
        <Button variant="outline" onClick={closeModal} disabled={isPending}>
          Cancel
        </Button>
        <Button form="create-question" disabled={isPending}>
          Submit
        </Button>
      </DialogFooter>
    </>
  )
}

export default AddQuestionManually
