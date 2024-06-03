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
import { useDeleteExamMutation } from '@/hooks/services/exam'
import { Modals, useModalState } from '@/store/modal'
import { useQueryClient } from '@tanstack/react-query'

export function DeleteExamModal() {
  const { open, closeModal, data } = useModalState(Modals.DELETE_EXAM)

  const exam = data?.exam
  const topicId = data?.topicId

  const { mutateAsync: deleteExam, isPending: isDeleting } = useDeleteExamMutation()

  const queryClient = useQueryClient()

  const handleDeleteExam = async () => {
    return deleteExam(exam?.id!).then(() => {
      closeModal()
      const queryKey: any[] = ['exams']
      if (topicId) {
        queryKey.push({ topicId })
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
            <DialogDescription>
              Are you sure you want to delete the exam <strong>{exam?.exam_name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteExam} disabled={isDeleting}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}
