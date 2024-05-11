import VerifyAccountPage from '@/components/pages/auth/verify-account/page'
import { routers } from '@/lib/constants/routers'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

const Page = (props: { searchParams: { email?: string | string[]; isAuth?: boolean } }) => {
  const searchParams = props.searchParams
  const email = Array.isArray(searchParams.email) ? searchParams.email[0] : searchParams.email

  const isAuth = searchParams.isAuth
  if (!email) {
    return redirect(routers.login)
  }

  return <VerifyAccountPage email={email} isAuth={isAuth} />
}

export const metadata: Metadata = {
  title: DOCUMENT_TITLES.AUTH.VERIFY_ACCOUNT,
  description: DOCUMENTS_DESCRIPTIONS.AUTH.VERIFY_ACCOUNT,
}

export default Page
