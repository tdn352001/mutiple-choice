import LoginPage from '@/components/pages/auth/login'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { Metadata } from 'next'

const Page = () => {
  return <LoginPage />
}

export const metadata: Metadata = {
  title: DOCUMENT_TITLES.AUTH.LOGIN,
  description: DOCUMENTS_DESCRIPTIONS.AUTH.LOGIN,
}

export default Page
