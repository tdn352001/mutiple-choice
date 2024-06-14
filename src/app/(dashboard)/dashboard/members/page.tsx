import MembersPage from '@/components/pages/dashboard/members/home'
import { DOCUMENT_TITLES, DOCUMENTS_DESCRIPTIONS } from '@/lib/constants/seo'
import { Metadata } from 'next'

const Page = async () => {
  return <MembersPage />
}

export const metadata: Metadata = {
  title: DOCUMENT_TITLES.DASHBOARD.MEMBERS.HOME,
  description: DOCUMENTS_DESCRIPTIONS.DASHBOARD.MEMBERS.HOME,
}

export default Page
