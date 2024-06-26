'use client'
import ErrorAlert from '@/components/custom/error-alert'
import CourseSelect from '@/components/forms/topics/course-select'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateTopicMutation } from '@/hooks/services/topics/use-create-topic-mutation'
import { dynamicRouters } from '@/lib/constants/routers'
import { TopicSchema, topicSchema } from '@/lib/schemas/topics'
import { useCreateTopicStore } from '@/store/site/create-topic'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormValue = TopicSchema

const fields = [
  {
    name: 'topic_name',
    label: 'Topic Name',
  },
  {
    name: 'topic_code',
    label: 'Topic Code',
  },
]

const CreateTopicForm = () => {
  const initialCourse = useCreateTopicStore((state) => state.course)

  const [error, setError] = useState('')

  const { mutateAsync: createTopic, isPending } = useCreateTopicMutation()

  const router = useRouter()

  const form = useForm<FormValue>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      topic_name: '',
      topic_code: '',
      description: '',
      course_id: initialCourse?.id,
      active: false,
    },
  })

  const handleSubmit = async (formValue: FormValue) => {
    return createTopic({
      ...formValue,
    })
      .then(() => {
        toast.success('Create topic successfully!')
        router.push(dynamicRouters.courseById(formValue.course_id))
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong!')
      })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 w-full max-w-[32rem]">
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

          <FormField
            control={form.control}
            name="course_id"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <CourseSelect onValueChange={field.onChange} value={field.value} />
                  <FormMessage />
                </FormItem>
              )
            }}
          />

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
                  <span>Active topic</span>
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

export default CreateTopicForm
