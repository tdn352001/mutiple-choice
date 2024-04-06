import { buttonVariants } from '@/components/ui/button'
import { Icon, IconName } from '@/components/ui/icon'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type CustomLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
  icon?: IconName
}
export const CustomLink = ({ className, children, icon, ...props }: CustomLinkProps) => {
  return (
    <Link className={cn(buttonVariants({ variant: 'default', size: 'reponsive' }), 'gap-2')} {...props}>
      {icon && <Icon name={icon} className="h-4 w-4" />}
      <span className="hidden md:block">{children}</span>
    </Link>
  )
}
