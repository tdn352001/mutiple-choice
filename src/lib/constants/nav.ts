import { routers } from '@/lib/constants/routers'
import { NavItem } from '@/lib/types/nav'

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: routers.dashboard,
    icon: 'Home',
    label: 'Dashboard',
  },
  {
    title: 'Courses',
    href: routers.courses,
    icon: 'School',
    label: 'user',
  },
  {
    title: 'Members',
    href: '/dashboard/employee',
    icon: 'Users',
    label: 'employee',
  },
]
