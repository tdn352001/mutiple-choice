import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { QuestionSchema, questionShema } from '@/lib/schemas/question'
import { QuestionType } from '@/lib/types/question'
import { Modals, useCloseModal } from '@/store/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

type FormValue = QuestionSchema

const AddQuestionManually = () => {
  const closeModal = useCloseModal(Modals.ADD_QUESTION)

  const handleSubmit = () => {}

  const form = useForm<FormValue>({
    resolver: zodResolver(questionShema),
    defaultValues: {
      type: QuestionType.Normal,
      question: '',
    },
  })

  const handleFormSubmit = (formValue: FormValue) => {}

  const type = form.watch('type')

  return (
    <>
      <div>
        <Form {...form}>
          <form id="create-question" className="space-y-4 w-full" onSubmit={form.handleSubmit(handleFormSubmit)}>
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
          </form>
        </Form>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button form="create-question" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogFooter>
    </>
  )
}

export default AddQuestionManually
