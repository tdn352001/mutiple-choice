import ErrorAlert from '@/components/custom/error-alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUpdatePasswordMutation } from '@/hooks/services/auth/use-update-password-mutation'
import { ChangePasswordSchema, changePasswordSchema } from '@/lib/schemas/user'
import { Modals, useCloseModal, useIsModalOpen } from '@/store/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const fields = [
  {
    name: 'old_password',
    label: 'Old Password',
    type: 'password',
  },
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

type FormValue = ChangePasswordSchema

const ChangePasswordModal = () => {
  const [error, setError] = useState('')

  const open = useIsModalOpen(Modals.CHANGE_PASSWORD)

  const closeModal = useCloseModal(Modals.CHANGE_PASSWORD)

  const { mutateAsync: updatePassword, isPending } = useUpdatePasswordMutation()

  const form = useForm<FormValue>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: '',
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
      old_password: formValue.old_password,
      new_password: formValue.new_password,
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
          <DialogTitle>Change password</DialogTitle>
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

export default ChangePasswordModal
