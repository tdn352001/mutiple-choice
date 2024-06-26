'use client'
import ErrorAlert from '@/components/custom/error-alert'
import ProtectField from '@/components/forms/exams/protect-field'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateExamMutation } from '@/hooks/services/exam'
import { routers } from '@/lib/constants/routers'
import { ExamSchema, examSchema } from '@/lib/schemas/exams'
import { Topic } from '@/services/topics'
import { useCreateExamStore } from '@/store/site/create-exam'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import RelationShipField from './relationship-field'

type FormValue = ExamSchema

const fields = [
  {
    name: 'exam_name',
    label: 'Exam Name',
  },
  {
    name: 'exam_code',
    label: 'Exam Code',
  },
  {
    name: 'number_of_questions',
    label: 'Number of Questions',
  },
  {
    name: 'number_attempts',
    label: 'Number of Attempts',
  },
  {
    name: 'time_limit',
    label: 'Time Limit',
  },
]

interface CreateExamFormProps {
  initialTopic?: Topic
}

const CreateExamForm = () => {
  const initialTopic = useCreateExamStore((state) => state.topic)

  const [error, setError] = useState('')

  const { mutateAsync: createExam, isPending } = useCreateExamMutation()

  const router = useRouter()

  const [animationParent] = useAutoAnimate()

  const form = useForm<FormValue>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      exam_name: '',
      exam_code: '',
      description: '',
      number_of_questions: 1,
      number_attempts: 1,
      time_limit: 1,
      protect: false,
      password: '',
      course_id: initialTopic?.course_id,
      topic_id: initialTopic?.id,
      onsite_scoring: false,
      show_answer: false,
      active: true,
    },
    mode: 'all',
  })

  const handleSubmit = async (formValue: FormValue) => {
    return createExam({
      ...formValue,
      password: formValue.protect ? formValue.password : undefined,
    })
      .then(() => {
        toast.success('Create exam successfully!')
        router.push(routers.exams)
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong!')
      })
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-5 w-full max-w-[32rem]"
          ref={animationParent}
        >
          <ErrorAlert show={!!error} message={error} />
          {fields.map(({ label, name, ...inputProps }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof FormValue}
              render={({ field, fieldState: { invalid } }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input invalid={`${invalid}`} {...(field as any)} {...inputProps} />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          ))}

          <RelationShipField form={form} />

          <ProtectField form={form} />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            key="show_answer"
            control={form.control}
            name="show_answer"
            render={({ field }) => (
              <FormItem checkbox>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>

                <FormLabel>
                  <span>Show Answer</span>
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            key="active"
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem checkbox>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>

                <FormLabel>
                  <span>Active</span>
                </FormLabel>
              </FormItem>
            )}
          />

          <Button disabled={isPending} className="ml-auto w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateExamForm
