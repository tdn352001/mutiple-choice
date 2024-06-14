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
import { useDeleteImageMutation } from '@/hooks/services/images/use-delete-image-mutation'
import { Modals, useModalState } from '@/store/modal'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function DeleteImageModal() {
  const { open, closeModal, data } = useModalState(Modals.DELETE_IMAGE)

  const image = data?.image

  const { mutateAsync: deleteImage, isPending: isDeleting } = useDeleteImageMutation()

  const queryClient = useQueryClient()

  const handleDeleteImage = async () => {
    return deleteImage(image?.id!)
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ['images'],
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
          <DialogTitle>Delete Image</DialogTitle>
          <DialogDescription>Are you sure you want to delete this image?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteImage} disabled={isDeleting}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
