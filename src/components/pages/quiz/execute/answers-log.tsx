import AnswersRecord from '@/components/pages/quiz/execute/answer-record'
import Countdown from '@/components/pages/quiz/execute/countdown'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const AnswersLog = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline">
        <p className="text-sm">Time Remaining: &nbsp;</p>
        <Countdown />
      </div>

      <Separator />
      <AnswersRecord />
      <Button className="w-36 mx-auto hover:bg-primary/90 hover:text-primary-foreground" form="quiz-form">
        Submit
      </Button>
    </div>
  )
}

export default AnswersLog
