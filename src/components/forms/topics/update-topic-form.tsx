'use client'
import ErrorAlert from '@/components/custom/error-alert'
import CourseSelect from '@/components/forms/topics/course-select'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateTopicMutation } from '@/hooks/services/topics'
import { dynamicRouters } from '@/lib/constants/routers'
import { TopicSchema, topicSchema } from '@/lib/schemas/topics'
import { Topic } from '@/services/topics'
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

interface UpdateTopicFormProps {
  topic: Topic
}

const UpdateTopicForm = ({ topic }: UpdateTopicFormProps) => {
  const [error, setError] = useState('')

  const { mutateAsync: updateTopic, isPending } = useUpdateTopicMutation(topic.id)

  const router = useRouter()

  const form = useForm<FormValue>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      topic_name: topic.topic_name,
      topic_code: topic.topic_code,
      description: topic.description,
      course_id: topic.course_id,
      active: topic.active,
    },
  })

  const handleSubmit = async (formValue: FormValue) => {
    return updateTopic(formValue)
      .then(() => {
        toast.success('Update topic successfully!')
        router.push(dynamicRouters.topicById(topic.id))
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

export default UpdateTopicForm
