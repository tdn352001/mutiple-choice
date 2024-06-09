'use client'

import AddQuestionFromFile from '@/components/modals/question/add-questions/from-file'
import AddQuestionManually from '@/components/modals/question/add-questions/manually'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Modals, useModalState } from '@/store/modal'

export function AddQuestionModal() {
  const { open, closeModal, data } = useModalState(Modals.ADD_QUESTION)

  const type = data?.type

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Question</DialogTitle>
        </DialogHeader>
        {type === 'manually' ? <AddQuestionManually /> : <AddQuestionFromFile />}
      </DialogContent>
    </Dialog>
  )
}
