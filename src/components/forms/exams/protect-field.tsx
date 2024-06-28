import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { ExamSchema } from '@/lib/schemas/exams'
import { UseFormReturn } from 'react-hook-form'

interface ProtectFieldProps {
  form: UseFormReturn<ExamSchema>
}

const ProtectField = ({ form }: ProtectFieldProps) => {
  const protect = form.watch('protect')

  // useEffect(() => {
  //   if (!protect) {
  //     form.setValue('password', '')
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [protect])

  return (
    <>
      <FormField
        control={form.control}
        name="protect"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Protect</FormLabel>
              <FormDescription>Protect the exam with a password</FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
      {protect && (
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState: { invalid } }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input invalid={`${invalid}`} type="password" {...(field as any)} />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
      )}
    </>
  )
}

export default ProtectField
