import ForgotPasswordPage from '@/components/pages/auth/forgot-password'
import { routers } from '@/lib/constants/routers'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { getDocumentTitle } from '@/lib/get-document-title'
import { Metadata } from 'next'

const Page = () => {
  return <ForgotPasswordPage />
}

export const metadata: Metadata = {
  title: DOCUMENT_TITLES.AUTH.FORGOT_PASSWORD,
  description: DOCUMENTS_DESCRIPTIONS.AUTH.FORGOT_PASSWORD,
}

export default Page
