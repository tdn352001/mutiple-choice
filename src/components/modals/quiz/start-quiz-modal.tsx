import ErrorAlert from '@/components/custom/error-alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useStartQuizMutation } from '@/hooks/services/quiz'
import { StartQuizSchema, startQuizSchema } from '@/lib/schemas/quiz'
import { Modals, useModalState } from '@/store/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormValue = StartQuizSchema

const StartQuizModal = () => {
  const [error, setError] = useState('')

  const { open, closeModal, data } = useModalState(Modals.START_QUIZ)

  const exam = data?.exam

  const router = useRouter()

  const { mutateAsync: startQuiz, isPending } = useStartQuizMutation()

  const form = useForm<FormValue>({
    resolver: zodResolver(startQuizSchema),
    defaultValues: {
      password: '',
    },
  })

  const handleCloseModal = () => {
    closeModal()
    form.reset()
  }

  const handleSubmit = async (formValue: FormValue) => {
    return startQuiz({
      exam_id: exam?.id!,
      password: formValue.password,
    })
      .then(() => {
        handleCloseModal()
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong. Please try again later.')
      })
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start quiz</DialogTitle>
          <DialogDescription>Enter the password to start quiz</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex flex-col gap-2">
            <ErrorAlert show={!!error} message={error} />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState: { invalid } }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input invalid={`${invalid}`} {...(field as any)} />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <div className="mt-4 w-full flex items-center justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default StartQuizModal
