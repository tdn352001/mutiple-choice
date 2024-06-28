import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCreateMemberFromCsvMutation } from '@/hooks/services/members/use-create-member-from-csv-mutation'
import { Modals, useCloseModal, useModalState } from '@/store/modal'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useQueryClient } from '@tanstack/react-query'
import { UploadCloud, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { FileRejection, FileWithPath, useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

const AddMemberFromCSVModal = () => {
  const { open, closeModal } = useModalState(Modals.CREATE_MEMBER_FROM_CSV)

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add member</DialogTitle>
          <DialogDescription>Add members from CSV file</DialogDescription>
        </DialogHeader>
        <AddMemberFromFile />
      </DialogContent>
    </Dialog>
  )
}

const AddMemberFromFile = () => {
  const closeModal = useCloseModal(Modals.CREATE_MEMBER_FROM_CSV)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [animationParent] = useAutoAnimate()

  const handleFileDrop = useCallback((acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length) {
      toast.error(rejectedFiles[0].errors[0].message)
      return
    }

    if (acceptedFiles.length) {
      setSelectedFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileDrop,
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
    minSize: 1,
  })

  const handleRemoveFile = () => {
    setSelectedFile(null)
  }

  const { mutateAsync: createMembers, isPending } = useCreateMemberFromCsvMutation()

  const queryClient = useQueryClient()

  const handleSubmit = async () => {
    return createMembers({
      csv_file: selectedFile!,
    })
      .then((res) => {
        const successCount = res.data.reduce((acc: number, curr) => (curr.success ? acc + 1 : acc), 0)
        const failedCount = res.data.length - successCount
        if (successCount) {
          let message = `${successCount} members added successfully`
          if (failedCount) {
            message += `, ${failedCount} failed`
          }
          toast.success(message)
        } else {
          toast.error('No members added')
        }
        queryClient.invalidateQueries({
          queryKey: ['members'],
        })
        closeModal()
      })
      .catch((err) => {
        return toast.error(err.message || 'Something went wrong. Please try again.')
      })
  }

  return (
    <>
      <div className="w-full overflow-hidden space-y-3" ref={animationParent}>
        {selectedFile ? (
          <div key="selected" className="w-full space-y-1">
            <p className="text-sm font-medium leading-none">Selected file</p>
            <div className="w-full px-3 py-2 flex items-center justify-between rounded-md border bg-transparent text-sm font-medium ">
              <p className="flex-1 line-clamp-1">{selectedFile.name}</p>
              <Button className="size-8" variant="ghost" size="icon" onClick={handleRemoveFile}>
                <X />
              </Button>
            </div>
          </div>
        ) : (
          <div
            key="drop-zone"
            className="w-full flex flex-col gap-1 lg:gap-2 items-center p-4 border border-dashed rounded-lg"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <UploadCloud className="size-12" />
            <p className="font-medium text-lg">Choose file or drag and drop here</p>
            <p className="text-sm">Accepted file types: .csv</p>
          </div>
        )}
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={closeModal} disabled={isPending}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!selectedFile || isPending}>
          Submit
        </Button>
      </DialogFooter>
    </>
  )
}

export default AddMemberFromCSVModal
