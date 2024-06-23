'use client'
import { CustomLink } from '@/components/custom/link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { routers } from '@/lib/constants/routers'
import { sessionManager } from '@/lib/session'
import { Modals, useOpenModal } from '@/store/modal'
import { useUserStore } from '@/store/user'
import { usePathname, useRouter } from 'next/navigation'

export function UserNav() {
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const router = useRouter()

  const openChangePasswordModal = useOpenModal(Modals.CHANGE_PASSWORD)

  const viewProfile = () => router.push(routers.profile)

  const handleChangePassword = () => openChangePasswordModal()

  const pathname = usePathname()

  const handleSignOut = () => {
    router.push(routers.login)
    setUser(undefined)
    sessionManager.removeAccessToken()
  }

  if (!user) {
    return (
      <CustomLink variant="ghost" href={`${routers.login}?callbackUrl=${pathname}`}>
        Login
      </CustomLink>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-8 rounded-full">
          <Avatar className="size-8">
            <AvatarFallback className="capitalize">{user.full_name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.full_name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={viewProfile}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleChangePassword}>
          Change password
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
