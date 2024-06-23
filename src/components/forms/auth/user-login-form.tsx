'use client'
import ErrorAlert from '@/components/custom/error-alert'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLoginMutation } from '@/hooks/services/auth'
import { routers } from '@/lib/constants/routers'
import { getSearchParams } from '@/lib/get-search-params'
import { LoginSchema, loginSchema } from '@/lib/schemas/auth'
import { sessionManager } from '@/lib/session'
import { useUserStore } from '@/store/user'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type UserFormValue = LoginSchema

export default function UserLoginForm() {
  const router = useRouter()

  const setUser = useUserStore((state) => state.setUser)

  const [error, setError] = useState('')

  const { isPending, mutateAsync: login } = useLoginMutation()

  const form = useForm<UserFormValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = async (formValue: UserFormValue) => {
    return login(formValue)
      .then((res) => {
        const { token, user, refresh_token } = res.data
        if (user.active) {
          setUser(user)
          sessionManager.accessToken = token
          localStorage.setItem('refresh_token', refresh_token)
          const searchParams = getSearchParams()
          const callbackUrl = searchParams.get('callbackUrl')
          const isValidCallbackUrl = callbackUrl && callbackUrl.startsWith('/')
          router.push(isValidCallbackUrl ? callbackUrl : routers.dashboard)
        } else {
          sessionManager.tempAccessToken = token
          router.push(`${routers.verifyAccount}?email=${user.email}&isAuth=true`)
        }
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong!')
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 w-full">
        <ErrorAlert show={!!error} message={error} />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email..." disabled={isPending} {...field} />
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

        <p className="text-right text-sm text-muted-foreground">
          <Link href={routers.forgotPassword} className="hover:text-brand underline-offset-4 hover:underline">
            Forgot Password?
          </Link>
        </p>

        <Button disabled={isPending} className="ml-auto w-full" type="submit">
          Continue With Email
        </Button>
      </form>
    </Form>
  )
}
