import { QuizResultFormValue } from '@/components/pages/quiz/result-detail/type'
import { Button } from '@/components/ui/button'
import { dynamicRouters } from '@/lib/constants/routers'
import { QuestionType } from '@/lib/types/question'
import { useQuizResultStore } from '@/store/site/quiz-result'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'

enum AnswerStatus {
  Correct,
  Wrong,
  NotAnswered,
}

const AnswersLog = () => {
  const quiz = useQuizResultStore((state) => state.quiz)

  const { getValues } = useFormContext<QuizResultFormValue>()
  const userAnswers = getValues()
  const questionsInfo = useQuizResultStore((state) => state.questionsInfo)

  const router = useRouter()

  if (!quiz) return null

  const questions = quiz.questions_log

  const handleExit = () => {
    if (useQuizResultStore.getState().backForExit) {
      router.back()
    } else {
      router.push(dynamicRouters.examById(quiz.exam.id))
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-wrap items-center gap-2">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[question.question_id]

          const status = (function () {
            const correctAnswer = questionsInfo?.[question.question_id]?.correctAnswers ?? []
            if (userAnswer) {
              if (question.type === QuestionType.Normal) {
                const answer = typeof userAnswer === 'string' ? userAnswer : userAnswer[0]
                return correctAnswer.includes(Number(answer)) ? AnswerStatus.Correct : AnswerStatus.Wrong
              } else if (question.type === QuestionType.Multiple) {
                const answer = typeof userAnswer === 'string' ? [userAnswer] : userAnswer
                const isCorrect =
                  correctAnswer.length === answer.length &&
                  correctAnswer.every((correct) => answer.includes(String(correct)))
                return isCorrect ? AnswerStatus.Correct : AnswerStatus.Wrong
              }
            }

            if (question.type === QuestionType.Essay) {
              return userAnswer ? AnswerStatus.Correct : AnswerStatus.NotAnswered
            }

            return AnswerStatus.NotAnswered
          })()

          return (
            <Button
              key={question.question_id}
              type="button"
              variant={
                status === AnswerStatus.NotAnswered
                  ? 'outline'
                  : status === AnswerStatus.Correct
                  ? 'success'
                  : 'destructive'
              }
              size="icon"
              onClick={() => {
                const questionEle = document.getElementById(`question-${question.question_id}`)
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

      <Button onClick={handleExit}>Exit</Button>
    </div>
  )
}

export default AnswersLog
