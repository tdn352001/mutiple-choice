import ErrorAlert from '@/components/custom/error-alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUpdateMemberProfileMutation } from '@/hooks/services/members'
import { UpdateMemberProfileSchema, updateMemberProfileSchema } from '@/lib/schemas/member'
import { Modals, useModalState } from '@/store/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormValue = UpdateMemberProfileSchema

const UpdateMemberProfileModal = () => {
  const [error, setError] = useState('')

  const { open, closeModal, data } = useModalState(Modals.UPDATE_MEMBER_PROFILE)

  const member = data?.member

  const { mutateAsync: updateProfile, isPending } = useUpdateMemberProfileMutation(member?.id!)

  const form = useForm<FormValue>({
    resolver: zodResolver(updateMemberProfileSchema),
    defaultValues: {
      full_name: member?.full_name || '',
      active: member?.active || false,
      is_admin: member?.is_admin || false,
    },
  })

  const handleCloseModal = () => {
    closeModal()
    form.reset({
      full_name: member?.full_name || '',
      active: member?.active || false,
      is_admin: member?.is_admin || false,
    })
  }

  const queryClient = useQueryClient()

  const handleSubmit = async (formValue: FormValue) => {
    return updateProfile(formValue)
      .then(() => {
        toast.success("Member's profile updated successfully.")
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
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update member&apos;s profile</DialogTitle>
          <DialogDescription>
            Update the profile for <strong>{member?.full_name}</strong>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex flex-col gap-3">
            <ErrorAlert show={!!error} message={error} />
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
      </DialogContent>
    </Dialog>
  )
}

export default UpdateMemberProfileModal
