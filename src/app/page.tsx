import { routers } from '@/lib/constants/routers'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

const Page = () => {
  return redirect(routers.dashboard)
}

export const metadata: Metadata = {
  title: DOCUMENT_TITLES.DASHBOARD.HOME,
  description: DOCUMENTS_DESCRIPTIONS.DASHBOARD.HOME,
}

export default Page
