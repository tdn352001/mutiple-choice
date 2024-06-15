'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Modals, useModalState } from '@/store/modal'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'

export function DeleteQuestionModal() {
  const { open, closeModal } = useModalState(Modals.LOGIN_REQUIRED)

  const router = useRouter()
  const pathname = usePathname()

  const handleLogin = () => {}

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Please Login</DialogTitle>
          <DialogDescription>You need to login to access this content.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleLogin}>
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
