import RegisterPage from '@/components/pages/auth/register'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { Metadata } from 'next'

const Page = () => {
  return <RegisterPage />
}

export const metadata: Metadata = {
  title: DOCUMENT_TITLES.AUTH.REGISTER,
  description: DOCUMENTS_DESCRIPTIONS.AUTH.REGISTER,
}

export default Page
