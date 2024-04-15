import React, { Suspense } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { Icon } from '@/components/ui/icon'
import UserLoginForm from '@/components/forms/auth/user-login-form'
import { getDocumentTitle } from '@/lib/get-document-title'
import { routers } from '@/lib/constants/routers'

const Page = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icon name="Command" className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
        </div>
        <Suspense>
          <UserLoginForm />
        </Suspense>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/register" className="hover:text-brand underline underline-offset-4">
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: getDocumentTitle({ pathname: routers.login }),
  description: 'Đăng nhập vào tài khoản của bạn',
}

export default Page