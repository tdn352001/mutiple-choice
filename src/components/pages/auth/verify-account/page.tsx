import UseVerifyAccountForm from '@/components/forms/auth/verify-account-form'
import { Icon } from '@/components/ui/icon'
import { routers } from '@/lib/constants/routers'
import Link from 'next/link'

const VerifyAccountPage = ({ email, isAuth }: { email: string; isAuth?: boolean }) => {
  return (
    <div className="container flex min-h-dvh min-w-full py-4 flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icon name="Command" className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Verify your account</h1>
          <p className="text-sm text-muted-foreground">Check your email for the verification code</p>
        </div>
        <UseVerifyAccountForm email={email} isAuth={isAuth} />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href={routers.login} className="hover:text-brand underline underline-offset-4">
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default VerifyAccountPage
