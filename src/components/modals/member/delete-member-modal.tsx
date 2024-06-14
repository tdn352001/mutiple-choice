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
import { useDeleteMemberMutation } from '@/hooks/services/members'
import { Modals, useModalState } from '@/store/modal'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function DeleteMemberModal() {
  const { open, closeModal, data } = useModalState(Modals.DELETE_MEMBER)

  const member = data?.member

  const { mutateAsync: deleteMember, isPending: isDeleting } = useDeleteMemberMutation()

  const queryClient = useQueryClient()

  const handleDeleteMember = async () => {
    return deleteMember(member?.id!)
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ['members'],
        })
      })
      .catch((err) => toast.error(err.message))
      .finally(() => {
        closeModal()
      })
  }

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Member</DialogTitle>
          <DialogDescription>Are you sure you want to delete this member?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteMember} disabled={isDeleting}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
