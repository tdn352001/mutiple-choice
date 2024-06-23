import UserRegisterForm from '@/components/forms/auth/user-register-form'
import { Icon } from '@/components/ui/icon'
import { routers } from '@/lib/constants/routers'
import Link from 'next/link'

const RegisterPage = () => {
  return (
    <div className="container flex min-h-dvh min-w-full py-4 flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Link href={routers.courses} className="mx-auto">
            <Icon name="Command" className=" h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
        </div>
        <UserRegisterForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href={routers.login} className="hover:text-brand underline underline-offset-4">
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
