'use client'
import ErrorAlert from '@/components/custom/error-alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateCourseMutation } from '@/hooks/services/courses/use-create-course-mutation'
import { routers } from '@/lib/constants/routers'
import { courseSchema, CourseSchema } from '@/lib/schemas/course'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormValue = CourseSchema

const fields = [
  {
    name: 'course_name',
    label: 'Course Name',
  },
  {
    name: 'course_code',
    label: 'Course Code',
  },
]

const CourseForm = () => {
  const [error, setError] = useState('')

  const { mutateAsync: createCourse, isPending } = useCreateCourseMutation()

  const router = useRouter()

  const form = useForm<FormValue>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      course_name: '',
      course_code: '',
      description: '',
      active: false,
    },
  })

  const handleSubmit = async (formValue: FormValue) => {
    return createCourse(formValue)
      .then(() => {
        toast.success('Create course successfully!')
        router.push(routers.courses)
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
                  <span>Active Course</span>
                </FormLabel>
              </FormItem>
            )}
          />

          <Button disabled={isPending} className="ml-auto w-full" type="submit">
            Continue With Email
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CourseForm
