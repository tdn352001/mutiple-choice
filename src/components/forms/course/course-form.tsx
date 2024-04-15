import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { courseSchema, CourseSchema } from '@/lib/schemas/course'
import { Button } from '@/components/ui/button'

type FormValue = CourseSchema

interface CourseFormProps {
  defaultValues?: Partial<FormValue>
}

const CourseForm = ({ defaultValues = {} }: CourseFormProps) => {
  const form = useForm<FormValue>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: '',
      shorthand: '',
      format: '',
      language: '',
      quantity: 0,
      ...defaultValues,
    },
  })

  const isPending = false

  const handleSubmit = async (formValue: FormValue) => {}

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên khóa học</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên khóa học..." disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shorthand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên viết tắt</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên viết tắt..." disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm your password..." disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
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
