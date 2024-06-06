'use client'
import { CustomLink } from '@/components/custom/link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { routers } from '@/lib/constants/routers'
import { sessionManager } from '@/lib/session'
import { Modals, useOpenModal } from '@/store/modal'
import { useUserStore } from '@/store/user'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function UserNav() {
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const openChangePasswordModal = useOpenModal(Modals.CHANGE_PASSWORD)

  const handleChangePassword = () => openChangePasswordModal()

  const pathname = usePathname()

  const handleSignOut = () => {
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
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onClick={handleChangePassword}>
            Change password
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link className="block w-full h-full" href={routers.login} onClick={handleSignOut}>
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
