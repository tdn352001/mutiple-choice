import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useCreateQuestionsFromCsvMutation } from '@/hooks/services/questions'
import { Modals, useCloseModal, useModalData } from '@/store/modal'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useQueryClient } from '@tanstack/react-query'
import { UploadCloud, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { FileRejection, FileWithPath, useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

const AddQuestionFromFile = () => {
  const closeModal = useCloseModal(Modals.ADD_QUESTION)

  const { examId } = useModalData(Modals.ADD_QUESTION)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isReplace, setIsReplace] = useState(false)

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

  const { mutateAsync: createQuestions, isPending } = useCreateQuestionsFromCsvMutation(examId)

  const queryClient = useQueryClient()

  const handleSubmit = async () => {
    return createQuestions({
      questions: selectedFile!,
      is_replace: isReplace,
    })
      .then((res) => {
        const successCount = res.data.reduce((acc: number, curr) => (curr.success ? acc + 1 : acc), 0)
        const failedCount = res.data.length - successCount
        if (successCount) {
          let message = `${successCount} questions added successfully`
          if (failedCount) {
            message += `, ${failedCount} failed`
          }
          toast.success(message)
        } else {
          toast.error('No questions added')
        }
        queryClient.invalidateQueries({
          queryKey: ['questions', { examId }],
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

        <div className="flex items-center gap-2 space-y-0">
          <Checkbox id="replace" checked={isReplace} onCheckedChange={(state) => setIsReplace(!!state)} />
          <Label htmlFor="replace">Replace old questions</Label>
        </div>
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

export default AddQuestionFromFile
