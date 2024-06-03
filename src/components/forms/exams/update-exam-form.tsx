'use client'
import ErrorAlert from '@/components/custom/error-alert'
import ProtectField from '@/components/forms/exams/protect-field'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateExamMutation } from '@/hooks/services/exam'
import { useGetTopicByIdQuery } from '@/hooks/services/topics'
import { routers } from '@/lib/constants/routers'
import { ExamSchema, examSchema } from '@/lib/schemas/exams'
import { Exam } from '@/services/exams'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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

interface UpdateExamFormProps {
  exam: Exam
}

const UpdateExamForm = ({ exam }: UpdateExamFormProps) => {
  const [error, setError] = useState('')

  const { mutateAsync: udpateExam, isPending } = useUpdateExamMutation(exam.id)

  const getTopicQuery = useGetTopicByIdQuery(exam.topic_id)

  const router = useRouter()

  const [animationParent] = useAutoAnimate()

  const form = useForm<FormValue>({
    resolver: zodResolver(examSchema),
    defaultValues: exam,
    mode: 'all',
  })

  const handleSubmit = async (formValue: FormValue) => {
    return udpateExam({
      ...formValue,
      password: formValue.protect ? formValue.password : undefined,
    })
      .then(() => {
        toast.success('Update exam successfully!')
        router.push(routers.exams)
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong!')
      })
  }

  useEffect(() => {
    if (getTopicQuery.data?.data.id) {
      form.setValue('course_id', getTopicQuery.data?.data.course_id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTopicQuery.data])

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
            key="active"
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem checkbox>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>

                <FormLabel>
                  <span>Active exam</span>
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

export default UpdateExamForm
