import ThemeToggle from '@/components/layout/dashboard/theme-toggle'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useUserStore } from '@/store/user'

interface UserOptionsProps {
  className?: string
}
const UserOptions = ({ className }: UserOptionsProps) => {
  const user = useUserStore((state) => state.user)

  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-8">
        <AvatarFallback className="capitalize">{user?.full_name[0]}</AvatarFallback>
      </Avatar>
      <ThemeToggle />
    </div>
  )
}

export default UserOptions
