import { Button } from '@/components/ui/button'
import { CheckboxPrimitive } from '@/components/ui/checkbox'
import { RadioPrimitive } from '@/components/ui/radio-group'
import { QuestionSchema } from '@/lib/schemas/question'
import { QuestionType } from '@/lib/types/question'
import { cn } from '@/lib/utils'
import { PlusCircle, X } from 'lucide-react'
import { UseFormReturn, useFieldArray, useFormState } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'

interface AnswerFieldProps {
  className?: string
  form: UseFormReturn<QuestionSchema>
}

const AnswerField = ({ className, form }: AnswerFieldProps) => {
  const type = form.watch('type')
  const answer = form.watch('answer')

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'answer',
  })

  const formState = useFormState({
    control: form.control,
  })

  if (type === QuestionType.Essay) {
    return null
  }

  const handleAddAnswer = () => {
    append({
      answer: '',
      is_correct: false,
    })
  }

  const answerError = formState.errors.answer
  const error = answerError?.root?.message || answerError?.message

  console.log({ errors: formState.errors, answerError, error, values: form.getValues() })

  return (
    <div className={cn('space-y-3', className)}>
      <p className="text-sm font-medium leading-none">Answers</p>
      <div className="w-full flex flex-col gap-3">
        {fields.map((field, index) => {
          return (
            <AnswerItem
              key={field.id}
              index={index}
              form={form}
              type={type}
              onRemove={remove}
              checked={answer?.at(index)?.is_correct}
              onCheckedChange={(index) => {
                if (!answer) {
                  return
                }

                if (type === QuestionType.Normal) {
                  const isCorrect = answer[index].is_correct
                  if (!isCorrect) {
                    const correctIndex = answer.findIndex((item) => item.is_correct)
                    if (correctIndex !== -1) {
                      update(correctIndex, { ...answer[correctIndex], is_correct: false })
                    }
                    update(index, { ...answer[index], is_correct: true })
                  }
                } else {
                  update(index, { ...answer[index], is_correct: !answer[index].is_correct })
                }
              }}
            />
          )
        })}
      </div>

      <Button className="-translate-x-3" type="button" variant="ghost" size="sm" onClick={handleAddAnswer}>
        <PlusCircle className="size-4 mr-2" />
        <span>Add Answer</span>
      </Button>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  )
}

interface AnswerItemProps {
  index: number
  form: UseFormReturn<QuestionSchema>
  onRemove: (index: number) => void
  value?: string
  checked?: boolean
  onCheckedChange?: (index: number) => void
  type?: string
}

const AnswerItem = ({ form, index, type, onRemove, checked, onCheckedChange }: AnswerItemProps) => {
  return (
    <div className="flex gap-2 items-start">
      <span className="block">
        {type === QuestionType.Normal ? (
          <RadioPrimitive className="block" checked={checked} onChange={() => onCheckedChange?.(index)} />
        ) : (
          <CheckboxPrimitive className="block" checked={checked} onChange={() => onCheckedChange?.(index)} />
        )}
      </span>
      <TextareaAutosize
        className="flex flex-1 rounded-md px-2 bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring resize-none"
        minRows={1}
        maxRows={3}
        placeholder="Enter answer here..."
        {...form.register(`answer.${index}.answer`)}
      />
      <Button className="size-6" variant="ghost" size="icon" type="button" onClick={() => onRemove(index)}>
        <X className="size-4" />
      </Button>
    </div>
  )
}

export default AnswerField
