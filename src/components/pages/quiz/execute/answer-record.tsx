import { QuizFormValue } from '@/components/pages/quiz/execute/type'
import { Button } from '@/components/ui/button'
import { useQuizStore } from '@/store/site/quiz'
import { useWatch } from 'react-hook-form'

const AnswersRecord = () => {
  const quiz = useQuizStore((state) => state.quiz)

  const userAnswers = useWatch<QuizFormValue>() || {}

  if (!quiz) return null

  const questions = quiz.questions_log

  return (
    <div className="w-full flex flex-wrap items-center gap-2">
      {questions.map((item, index) => {
        const userAnswer = userAnswers[item.question_id]
        const isAnswered = !!userAnswer && (typeof userAnswer === 'string' || userAnswer.length > 0)
        return (
          <Button
            key={item.question_id}
            type="button"
            variant={isAnswered ? 'default' : 'outline'}
            size="icon"
            onClick={() => {
              const questionEle = document.getElementById(`question-${item.question_id}`)
              if (questionEle) {
                questionEle.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            {index + 1}
          </Button>
        )
      })}
    </div>
  )
}

export default AnswersRecord
