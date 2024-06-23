import { QuizResultFormValue } from '@/components/pages/quiz/result-detail/type'
import { CheckboxPrimitive } from '@/components/ui/checkbox'
import { RadioPrimitive } from '@/components/ui/radio-group'
import { getImagePath } from '@/lib/get-image-path'
import { QuestionType } from '@/lib/types/question'
import { cn } from '@/lib/utils'
import { QuestionLog } from '@/services/quiz'
import { HTMLAttributes, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'

interface QuestionItemProps {
  className?: string
  index: number
  question: QuestionLog
  examId?: string | number
  correctAnswers?: number[]
  onPreviewImage: (url: string) => void
}

const getLetterByIndex = (index: number) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return alphabet[index]
}

const QuestionItem = ({
  className,
  index,
  examId,
  question,
  correctAnswers = [],
  onPreviewImage,
}: QuestionItemProps) => {
  const [loadError, setLoadError] = useState(false)

  const { register } = useFormContext<QuizResultFormValue>()

  const handleZoomImage = () => {
    if (question.image || !loadError) {
      onPreviewImage(getImagePath({ exam_id: examId!, image: question.image }))
    }
  }

  const Container = ({ className: containerClassName, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        id={`question-${question.question_id}`}
        className={cn('w-full flex flex-col gap-1 py-6 scroll-mt-20', containerClassName, className)}
        {...props}
      >
        <div className="flex gap-3 lg:gap-4 items-start">
          <span className="size-8 flex-shrink-0 flex items-center justify-center rounded-md text-sm font-medium border border-input bg-cyan-500 text-background">
            {index + 1}
          </span>
          <p className="min-h-10">{question.question}</p>
        </div>
        <div className="flex-1 flex flex-col gap-4 mt-2 px-2 lg:px-11">
          {question.image && (
            <img
              className="w-auto h-auto min-h-8 mx-auto mt-2 mb-2 max-w-[min(100%,600px)] rounded-sm cursor-pointer"
              src={getImagePath({
                exam_id: examId!,
                image: question.image,
              })}
              alt={question.question.slice(0, 20)}
              onClick={handleZoomImage}
              onLoad={() => {
                setLoadError(false)
              }}
              onError={() => {
                setLoadError(true)
              }}
            />
          )}
          <div className="w-full lg:pr-10">{children}</div>
        </div>
      </div>
    )
  }

  if (question.type === QuestionType.Normal) {
    return (
      <Container>
        <div className="flex flex-col gap-1">
          {question.answers.map((item, index) => {
            const isCorrect = item.id ? correctAnswers.includes(item.id) : false
            return (
              <label key={`${item.id}-${index}`} className="flex flex-row items-start gap-3 cursor-pointer group">
                <span className="flex items-center justify-center size-6 flex-shrink-0">
                  <RadioPrimitive disabled value={item.id || ''} {...register(question.question_id!.toString())} />
                </span>
                <p
                  className={cn(
                    'inline-block w-fit  group-has-[:checked]:bg-destructive/30',
                    isCorrect && 'bg-green-500/60 group-has-[:checked]:bg-green-500/60'
                  )}
                >
                  {getLetterByIndex(index)}. {item.answer}
                </p>
              </label>
            )
          })}
        </div>
      </Container>
    )
  }

  if (question.type === QuestionType.Multiple) {
    return (
      <Container>
        <div className="flex flex-col gap-1">
          {question.answers.map((item, index) => {
            const isCorrect = item.id ? correctAnswers.includes(item.id) : false

            return (
              <label key={`${item.id}-${index}`} className="flex flex-row items-start gap-3 cursor-pointer group">
                <span className="flex items-center justify-center size-6 flex-shrink-0">
                  <CheckboxPrimitive disabled value={item.id || ''} {...register(question.question_id!.toString())} />
                </span>
                <p
                  className={cn(
                    'inline-block w-fit  group-has-[:checked]:bg-destructive/30',
                    isCorrect && 'bg-green-500/60 group-has-[:checked]:bg-green-500/60'
                  )}
                >
                  {getLetterByIndex(index)}. {item.answer}
                </p>
              </label>
            )
          })}
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <TextareaAutosize
        disabled
        className={cn(
          'flex w-full rounded-md border border-green-500/60 placeholder-shown:border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
        )}
        minRows={5}
        placeholder="No answer"
        {...register(question.question_id!.toString())}
      />
    </Container>
  )
}

export default QuestionItem
