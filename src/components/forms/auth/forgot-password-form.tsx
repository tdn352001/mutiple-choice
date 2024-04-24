'use client'
import ErrorAlert from '@/components/custom/error-alert'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForgotPasswordMutation } from '@/hooks/services/auth'
import { routers } from '@/lib/constants/routers'
import { ForgotPasswordSchema, forgotPasswordSchema } from '@/lib/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type ForgotPasswordFormValue = ForgotPasswordSchema

const fields = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email...',
  },
]

export default function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormValue>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const [error, setError] = useState('')

  const { isPending, mutateAsync: forgotPassword } = useForgotPasswordMutation()

  const router = useRouter()

  const handleSubmit = async (formValue: ForgotPasswordFormValue) => {
    const { email } = formValue
    return forgotPassword(formValue)
      .then(() => {
        router.push(`${routers.resetPassword}?email=${email}`)
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong!')
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 w-full">
        <ErrorAlert show={!!error} message={error} />
        {fields.map(({ label, name, placeholder, type }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as keyof ForgotPasswordFormValue}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input placeholder={placeholder} disabled={isPending} type={type} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button disabled={isPending} className="ml-auto w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
