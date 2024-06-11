import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { QuestionSchema } from '@/lib/schemas/question'
import { QuestionType } from '@/lib/types/question'
import { UseFormReturn, useFieldArray } from 'react-hook-form'

interface AnswerFieldProps {
  form: UseFormReturn<QuestionSchema>
}

const AnswerField = ({ form }: AnswerFieldProps) => {
  const type = form.watch('type')

  const { fields } = useFieldArray({
    name: 'answer',
  })

  if (type === QuestionType.Essay) {
    return null
  }

  if (type === QuestionType.Normal) {
    return (
      <div>
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => {
            const answers = field.value
            const correctAnswer = answers?.find((item) => !!item.is_correct)
            const value = correctAnswer?.answer || ''

            return (
              <FormItem className="space-y-3">
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={value} className="flex flex-col space-y-1">
                    {fields.map((field) => {
                      return (
                        <FormItem key={field.id} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="all" />
                          </FormControl>
                          <FormLabel className="font-normal">All new messages</FormLabel>
                        </FormItem>
                      )
                    })}
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="all" />
                      </FormControl>
                      <FormLabel className="font-normal">All new messages</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="mentions" />
                      </FormControl>
                      <FormLabel className="font-normal">Direct messages and mentions</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="none" />
                      </FormControl>
                      <FormLabel className="font-normal">Nothing</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
      </div>
    )
  }

  return <div>AnswerField</div>
}

export default AnswerField
