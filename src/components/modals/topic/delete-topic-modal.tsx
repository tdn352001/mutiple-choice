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
import { useDeleteTopicMutation } from '@/hooks/services/topics'
import { Modals, useModalState } from '@/store/modal'
import { useQueryClient } from '@tanstack/react-query'

export function DeleteTopicModal() {
  const { open, closeModal, data } = useModalState(Modals.DELETE_TOPIC)

  const topic = data?.topic
  const courseId = data?.courseId

  const { mutateAsync: deleteTopic, isPending: isDeleting } = useDeleteTopicMutation()

  const queryClient = useQueryClient()

  const handleDeleteTopic = async () => {
    return deleteTopic(topic?.id!).then(() => {
      closeModal()
      const queryKey: any[] = ['topics']
      if (courseId) {
        queryKey.push({ courseId })
      }
      queryClient.invalidateQueries({
        queryKey,
      })
    })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Topic</DialogTitle>
            <DialogDescription className="line-clamp-3">
              Are you sure you want to delete the topic&nbsp;
              <strong>{topic?.topic_name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTopic} disabled={isDeleting}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
