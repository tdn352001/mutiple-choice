import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { Icon } from '@/components/ui/icon'
import UserRegisterForm from '@/components/forms/auth/user-register-form'
import { routers } from '@/lib/constants/routers'
import { getDocumentTitle } from '@/lib/get-document-title'

const Page = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icon name="Command" className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
        </div>
        <UserRegisterForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <Link href="#" className="hover:text-brand underline underline-offset-4">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="#" className="hover:text-brand underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: getDocumentTitle({ pathname: routers.register }),
  description: 'Đăng nhập vào tài khoản của bạn',
}

export default Page
