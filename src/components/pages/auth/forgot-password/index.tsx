import ForgotPasswordForm from '@/components/forms/auth/forgot-password-form'
import { SvgIcon } from '@/components/ui/icon'
import { routers } from '@/lib/constants/routers'
import Link from 'next/link'

const ForgotPasswordPage = () => {
  return (
    <div className="container flex min-h-dvh min-w-full py-4 flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <SvgIcon className="mx-auto h-6 w-6" icon="logo" />
          <h1 className="text-2xl font-semibold tracking-tight">Forgot Password</h1>
          <p className="text-sm text-muted-foreground">Enter your email to reset password</p>
        </div>

        <ForgotPasswordForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href={routers.login} className="hover:text-brand underline underline-offset-4">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
