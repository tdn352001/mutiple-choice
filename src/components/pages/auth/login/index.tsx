import UserLoginForm from '@/components/forms/auth/user-login-form'
import { SvgIcon } from '@/components/ui/icon'
import { routers } from '@/lib/constants/routers'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Link href={routers.courses} className="mx-auto">
            <SvgIcon className=" h-6 w-6" icon="logo" />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
        </div>
        <UserLoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href={routers.register} className="hover:text-brand underline underline-offset-4">
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
