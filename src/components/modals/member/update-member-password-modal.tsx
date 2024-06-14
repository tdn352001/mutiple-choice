import ErrorAlert from '@/components/custom/error-alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUpdateMemberPasswordMutation } from '@/hooks/services/members'
import { UpdateMemberPasswordSchema, updateMemberPasswordSchema } from '@/lib/schemas/member'
import { Modals, useModalState } from '@/store/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const fields = [
  {
    name: 'new_password',
    label: 'New Password',
    type: 'password',
  },
  {
    name: 'confirm_password',
    label: 'Confirm Password',
    type: 'password',
  },
]

type FormValue = UpdateMemberPasswordSchema

const UpdateMemberPasswordModal = () => {
  const [error, setError] = useState('')

  const { open, closeModal, data } = useModalState(Modals.UPDATE_MEMBER_PASSWORD)

  const member = data?.member

  const { mutateAsync: updatePassword, isPending } = useUpdateMemberPasswordMutation(member?.id!)

  const form = useForm<FormValue>({
    resolver: zodResolver(updateMemberPasswordSchema),
    defaultValues: {
      new_password: '',
      confirm_password: '',
    },
  })

  const handleCloseModal = () => {
    closeModal()
    form.reset()
  }

  const handleSubmit = async (formValue: FormValue) => {
    return updatePassword({
      password: formValue.confirm_password,
    })
      .then(() => {
        toast.success('Password updated successfully.')
        handleCloseModal()
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong. Please try again later.')
      })
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update member&apos;s password</DialogTitle>
          <DialogDescription>
            Update the password for <strong>{member?.full_name}</strong>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex flex-col gap-2">
            <ErrorAlert show={!!error} message={error} />
            {fields.map(({ label, name, ...inputProps }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as keyof FormValue}
                render={({ field, fieldState: { invalid } }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input invalid={`${invalid}`} {...(field as any)} {...inputProps} />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
            ))}
            <div className="mt-4 w-full flex items-center justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateMemberPasswordModal
