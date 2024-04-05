import Header from '@/components/layout/dashboard/header'
import Sidebar from '@/components/layout/dashboard/sidebar'
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

export default Layout
