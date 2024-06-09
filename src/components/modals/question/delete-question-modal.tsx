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
import { useDeleteQuestionMutation } from '@/hooks/services/questions'
import { Modals, useModalState } from '@/store/modal'
import { useQueryClient } from '@tanstack/react-query'

export function DeleteQuestionModal() {
  const { open, closeModal, data } = useModalState(Modals.DELETE_QUESTION)

  const question = data?.question
  const examId = data?.examId

  const { mutateAsync: deleteQuestion, isPending: isDeleting } = useDeleteQuestionMutation()

  const queryClient = useQueryClient()

  const handleDeleteQuestion = async () => {
    return deleteQuestion(question?.id!).then(() => {
      closeModal()
      const queryKey: any[] = ['questions']
      if (examId) {
        queryKey.push({ examId })
      }
      queryClient.invalidateQueries({
        queryKey,
      })
    })
  }

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete course</DialogTitle>
          <DialogDescription>Are you sure you want to delete this question?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteQuestion} disabled={isDeleting}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
