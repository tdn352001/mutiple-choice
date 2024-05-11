import ResetPasswordPage from '@/components/pages/auth/reset-password/page'
import { routers } from '@/lib/constants/routers'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

const Page = (props: { searchParams: { email?: string | string[] } }) => {
  const searchParams = props.searchParams
  const email = Array.isArray(searchParams.email) ? searchParams.email[0] : searchParams.email

  if (!email) {
    return redirect(routers.login)
  }

  return <ResetPasswordPage email={email} />
}

export const metadata: Metadata = {
  title: DOCUMENT_TITLES.AUTH.RESET_PASSWORD,
  description: DOCUMENTS_DESCRIPTIONS.AUTH.RESET_PASSWORD,
}

export default Page
