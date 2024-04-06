import { routers } from '@/lib/constants/routers'
import { NavItem } from '@/lib/types/nav'

export const navItems: NavItem[] = [
  {
    title: 'Trang chủ',
    href: routers.dashboard,
    icon: 'Home',
    label: 'Dashboard',
  },
  {
    title: 'Khóa học',
    href: routers.courses,
    icon: 'School',
    label: 'user',
  },
  {
    title: 'Thành viên',
    href: '/dashboard/employee',
    icon: 'Users',
    label: 'employee',
  },
]
