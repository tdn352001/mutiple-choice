import { DashboardNav } from '@/components/layout/dashboard/dashboard-nav'

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <nav className="hidden w-64 h-full relative border-r lg:block xl:w-72 ">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">Overview</h2>
            <DashboardNav />
          </div>
        </div>
      </div>
    </nav>
  )
}
