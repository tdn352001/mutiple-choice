import { routers } from '@/lib/constants/routers'
import { NavItem } from '@/lib/types/nav'

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: routers.dashboard,
    icon: 'Home',
  },

  {
    title: 'Courses',
    href: routers.courses,
    icon: 'School',
  },
  {
    title: 'Topics',
    href: routers.topics,
    icon: 'Layers3',
  },
  {
    title: 'Exams',
    href: routers.exams,
    icon: 'SquareMenu',
  },
  {
    title: 'Members',
    href: '/dashboard/employee',
    icon: 'Users',
  },
]
