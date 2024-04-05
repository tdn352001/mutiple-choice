'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { routers } from '@/lib/constants/routers'
import { Role } from '@/lib/types/role'
import { useLoginMutation } from '@/hooks/services/auth'
import { LoginSchema, loginSchema } from '@/lib/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

type UserFormValue = LoginSchema

type UserAuthFormProps = {
  role?: Role
}

export default function UserLoginForm({ role = Role.User }: UserAuthFormProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get('callbackUrl')

  const { isPending, mutateAsync: login } = useLoginMutation()

  const form = useForm<UserFormValue>({
    resolver: zodResolver(loginSchema),
    shouldUseNativeValidation: false,
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const handleSubmit = async (formValue: UserFormValue) => {
    login(formValue)
      .then((res) => {
        console.log({ res })
        const path = role === Role.Admin ? routers.admin.dashboard : routers.dashboard
        router.push(callbackUrl ?? path)
      })
      .catch(() => {})
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email..." disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password..." disabled={isPending} {...field} />
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
  )
}
