import Header from '@/components/layout/dashboard/header'
import Sidebar from '@/components/layout/dashboard/sidebar'
import { routers } from '@/lib/constants/routers'
import { getDocumentTitle } from '@/lib/get-document-title'
import { Metadata } from 'next'
import React, { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full pt-16">{children}</main>
      </div>
    </>
  )
}

export const metadata: Metadata = {
  title: getDocumentTitle({ pathname: routers.dashboard }),
}

export default Layout
