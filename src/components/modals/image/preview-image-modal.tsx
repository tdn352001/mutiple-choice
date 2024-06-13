'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Modals, useModalState } from '@/store/modal'

export function PreviewImageModal() {
  const { open, closeModal, data } = useModalState(Modals.PREVIEW_IMAGE)

  const image = data?.imageUrl

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="bg-transparent border-none w-fit h-fit !max-w-none [&_button]:hidden">
        <div className="w-full flex items-start justify-center">
          <img src={image} alt="Image" className="w-auto h-auto max-w-[80vw] max-h-[80dvh] rounded-lg " />
        </div>
      </DialogContent>
    </Dialog>
  )
}
