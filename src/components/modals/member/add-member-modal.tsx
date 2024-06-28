import ErrorAlert from '@/components/custom/error-alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreateMemberMutation } from '@/hooks/services/members/use-create-member-mutation'
import { AddMemberSchema, addMemberSchema } from '@/lib/schemas/member'
import { Modals, useModalState } from '@/store/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormValue = AddMemberSchema

const AddMemberModal = () => {
  const { open, closeModal } = useModalState(Modals.CREATE_MEMBER)

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add member</DialogTitle>
          <DialogDescription>Add a new member</DialogDescription>
        </DialogHeader>
        <AddMemberForm />
      </DialogContent>
    </Dialog>
  )
}

const AddMemberForm = () => {
  const [error, setError] = useState('')

  const { closeModal } = useModalState(Modals.CREATE_MEMBER)

  const { mutateAsync: createMember, isPending } = useCreateMemberMutation()

  const queryClient = useQueryClient()

  const form = useForm<FormValue>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      active: true,
      is_admin: false,
    },
  })

  const handleCloseModal = () => {
    closeModal()
    form.reset()
  }

  const handleSubmit = async (formValue: FormValue) => {
    return createMember(formValue)
      .then(() => {
        toast.success('Member created.')
        queryClient.invalidateQueries({
          queryKey: ['members'],
        })
        handleCloseModal()
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong. Please try again later.')
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex flex-col gap-3" autoComplete="off">
        <ErrorAlert show={!!error} message={error} />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" autoComplete="off" />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
        <FormField
          key="active"
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem checkbox>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>

              <FormLabel>
                <span>Active</span>
              </FormLabel>
            </FormItem>
          )}
        />

        <FormField
          key="is_admin"
          control={form.control}
          name="is_admin"
          render={({ field }) => (
            <FormItem checkbox>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>

              <FormLabel>
                <span>Admin</span>
              </FormLabel>
            </FormItem>
          )}
        />

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
  )
}

export default AddMemberModal
