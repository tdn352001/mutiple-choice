import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { dynamicRouters } from '@/lib/constants/routers'
import { Modals, useModalState } from '@/store/modal'
import moment from 'moment'
import { useRouter } from 'next/navigation'

const QuizResultModal = () => {
  const { open, closeModal, data } = useModalState(Modals.QUIZ_RESULT)

  const quiz = data?.quiz

  const router = useRouter()

  const takenTime = moment.duration(moment(quiz?.end_time).diff(moment(quiz?.start_time))).asSeconds()
  const minutes = Math.floor(takenTime / 60)
  const seconds = Math.floor(takenTime % 60)

  const handleCloseModal = () => {
    closeModal()
    if (quiz) {
      router.replace(dynamicRouters.examById(quiz.exam.id))
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Result</DialogTitle>
        </DialogHeader>

        <div className="w-full p-8 flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-12 flex-shrink-0">
          <div className="self-start flex flex-col gap-1 ">
            <div className="size-16 lg:size-20 rounded-sm border border-foreground flex items-center justify-center">
              <span className="font-medium text-lg lg:text-2xl tracking-wide lg:tracking-widest">{quiz?.score}</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col lg:flex-row flex-wrap gap-1 lg:gap-x-8 lg:gap-y-2">
            <p className="text-sm lg:text-base">
              <span className="font-medium">Exam: </span>
              <span>{quiz?.exam.exam_name}</span>
            </p>
            <p className="text-sm lg:text-base">
              <span className="font-medium">Ful name: </span>
              <span>{quiz?.user?.full_name}</span>
            </p>
            <p className="text-sm lg:text-base">
              <span className="font-medium">Email: </span>
              <span>{quiz?.user?.email}</span>
            </p>
            <p className="text-sm lg:text-base">
              <span className="font-medium">Start time: </span>
              <span>{moment(quiz?.start_time).format('DD/MM/YYYY HH:mm:ss')}</span>
            </p>
            <p className="text-sm lg:text-base">
              <span className="font-medium">End time: </span>
              <span>{moment(quiz?.end_time).format('DD/MM/YYYY HH:mm:ss')}</span>
            </p>
            <p className="text-sm lg:text-base">
              <span className="font-medium">Time limit: </span>
              <span>{quiz?.exam.time_limit} minutes</span>
            </p>
            <p className="text-sm lg:text-base">
              <span className="font-medium">Time taken: </span>
              <span>{`${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ${seconds}`} </span>
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default QuizResultModal
