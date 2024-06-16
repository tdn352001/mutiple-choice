import { QuizFormValue } from '@/components/pages/quiz/execute/type'
import { CheckboxPrimitive } from '@/components/ui/checkbox'
import { RadioPrimitive } from '@/components/ui/radio-group'
import { getImagePath } from '@/lib/get-image-path'
import { QuestionType } from '@/lib/types/question'
import { cn } from '@/lib/utils'
import { QuestionLog } from '@/services/quiz'
import { HTMLAttributes } from 'react'
import { UseFormReturn } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'

interface QuestionItemProps {
  className?: string
  index: number
  question: QuestionLog
  examId?: string | number
  form: UseFormReturn<QuizFormValue>
}

const getLetterByIndex = (index: number) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return alphabet[index]
}

const QuestionItem = ({ className, index, examId, question, form }: QuestionItemProps) => {
  const Container = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        id={`question-${question.question_id}`}
        className={cn('w-full flex flex-col gap-1 py-6 scroll-mt-20')}
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
              className="w-auto h-auto min-h-8 mx-auto mt-2 mb-2 max-w-[min(100%,600px)] rounded-sm"
              src={getImagePath({
                exam_id: examId!,
                image: question.image,
              })}
              alt={question.question.slice(0, 20)}
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
            return (
              <label key={`${item.id}-${index}`} className="flex flex-row items-start gap-3 cursor-pointer">
                <span className="flex items-center justify-center size-6 flex-shrink-0">
                  <RadioPrimitive value={JSON.stringify(item)} {...form.register(question.question_id!.toString())} />
                </span>
                <p>
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
            return (
              <label key={`${item.id}-${index}`} className="flex flex-row items-start gap-3 cursor-pointer">
                <span className="flex items-center justify-center size-6 flex-shrink-0">
                  <CheckboxPrimitive
                    value={JSON.stringify(item)}
                    {...form.register(question.question_id!.toString())}
                  />
                </span>
                <p>
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
        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        minRows={5}
        placeholder="Enter answer here..."
        {...form.register(question.question_id!.toString())}
      />
    </Container>
  )
}

export default QuestionItem
