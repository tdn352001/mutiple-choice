import ErrorAlert from '@/components/custom/error-alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUpdateProfileMutation } from '@/hooks/services/auth'
import { UserNameSchema, userNameSchema } from '@/lib/schemas/user'
import { User } from '@/services/auth'
import { Modals, useCloseModal, useIsModalOpen } from '@/store/modal'
import { useUserStore } from '@/store/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const fields = [
  {
    name: 'full_name',
    label: 'Full name',
  },
]

type FormValue = UserNameSchema

const EditProfileModal = () => {
  const [error, setError] = useState('')

  const open = useIsModalOpen(Modals.UPDATE_PROFILE)

  const closeModal = useCloseModal(Modals.UPDATE_PROFILE)

  const { mutateAsync: updateProfile, isPending } = useUpdateProfileMutation()

  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const form = useForm<FormValue>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      full_name: user?.full_name || '',
    },
  })

  const handleCloseModal = () => {
    closeModal()
    form.reset()
  }

  const handleSubmit = async (formValue: FormValue) => {
    return updateProfile(formValue)
      .then(() => {
        toast.success('Profile updated successfully.')
        const newUser: User = { ...user!, full_name: formValue.full_name }
        setUser(newUser)
        closeModal()
        form.reset({
          full_name: newUser.full_name,
        })
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong. Please try again later.')
      })
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update profile</DialogTitle>
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

export default EditProfileModal
