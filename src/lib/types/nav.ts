import { IconName } from '@/components/ui/icon'

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: IconName
  label?: string
  description?: string
}
