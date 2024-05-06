import Header from '@/components/layout/dashboard/header'
import Sidebar from '@/components/layout/dashboard/sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { routers } from '@/lib/constants/routers'
import { getDocumentTitle } from '@/lib/get-document-title'
import { Metadata } from 'next'
import React, { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-dvh grid gird-cols-1 grid-rows-[auto,minmax(0,1fr)] ">
      <Header />

      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[auto,minmax(0,1fr)]  grid-rows-1">
        <Sidebar />
        <main className="w-full h-full">
          <ScrollArea className="w-full h-full">{children}</ScrollArea>
        </main>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: getDocumentTitle({ pathname: routers.dashboard }),
}

export default Layout
