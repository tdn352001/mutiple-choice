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

interface ConfirmSubmitQuizModalProps {
  open: boolean
  notAnsweredCount?: number
  onConfirm: () => void
  onClose: () => void
  isPending?: boolean
}

export function ConfirmSubmitQuizModal({
  open,
  notAnsweredCount,
  isPending,
  onConfirm,
  onClose,
}: ConfirmSubmitQuizModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit</DialogTitle>
          <DialogDescription className="line-clamp-3">
            {notAnsweredCount ? (
              <p className="text-destructive">
                You have {notAnsweredCount} unanswered questions. Are you sure you want to submit the quiz?
              </p>
            ) : (
              <p>Are you sure you want to submit the quiz?</p>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {notAnsweredCount ? (
            <>
              <Button variant="outline" onClick={onConfirm} disabled={isPending}>
                Submit Anyway
              </Button>
              <Button type="button" onClick={onClose} disabled={isPending}>
                Countinue
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button type="button" onClick={onConfirm} disabled={isPending}>
                Submit
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
