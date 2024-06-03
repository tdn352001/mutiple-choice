'use client'

import { routers } from '@/lib/constants/routers'
import { redirect } from 'next/navigation'

const Page = () => {
  return redirect(routers.courses)
}

export default Page
