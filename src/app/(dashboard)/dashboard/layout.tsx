import Header from '@/components/layout/dashboard/header'
import DashboardGlobalModals from '@/components/layout/dashboard/modals'
import Sidebar from '@/components/layout/dashboard/sidebar'
import { routers } from '@/lib/constants/routers'
import { getDocumentTitle } from '@/lib/get-document-title'
import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-dvh grid gird-cols-1 grid-rows-[auto,minmax(0,1fr)] ">
      <Header />

      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[auto,minmax(0,1fr)]  grid-rows-1">
        <Sidebar />
        <main className="w-full h-full">{children}</main>
      </div>
      <DashboardGlobalModals />
    </div>
  )
}

export const metadata: Metadata = {
  title: getDocumentTitle({ pathname: routers.dashboard }),
}

export default Layout
