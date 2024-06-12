import SearchImages from '@/components/search-box/search-images'
import LoadingPage from '@/components/templates/loading-page'
import { Button } from '@/components/ui/button'
import { useGetImagesQuery, useUploadImagesMutation } from '@/hooks/services/images'
import { getImagePath } from '@/lib/get-image-path'
import { BaseApiQueryParams, OrderParam } from '@/lib/types/query-params'
import { Exam } from '@/services/exams'
import { ExamImage } from '@/services/images'
import { useCallback, useMemo, useState } from 'react'
import { FileRejection, FileWithPath, useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

interface ImagesTabProps {
  exam: Exam
}

const ImagesTab = ({ exam }: ImagesTabProps) => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)

  const params = useMemo((): BaseApiQueryParams => {
    const perPage = 12
    const sort = 'date_created'
    const order = OrderParam.Desc

    return {
      page: page + 1,
      per_page: perPage,
      sort_by: sort,
      order_by: order,
      search: search,
    }
  }, [page, search])

  const { data, isPending } = useGetImagesQuery({ examId: exam.id, params })
  const images = data?.images || []

  return (
    <div>
      <div className="flex flex-col-reverse items-start gap-2 md:flex-row md:justify-between md:items-center">
        <SearchImages search={search} setSearch={setSearch} />
        <UploadImage examId={exam.id} />
      </div>

      <div>
        {isPending ? (
          <div className="min-h-[40dvh] grid place-items-center">
            <LoadingPage />
          </div>
        ) : (
          <ImageList images={images} />
        )}
      </div>
    </div>
  )
}

const UploadImage = ({ examId }: { examId: string | number }) => {
  const { mutateAsync: uploadImages } = useUploadImagesMutation(examId)

  const handleFileDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length) {
        toast.error('Maximum file size is 3MB. Max 20 files allowed. Only .png, .jpg, .jpeg, .webp files are allowed.')
        return
      }

      if (acceptedFiles.length) {
        const formData = new FormData()
        acceptedFiles.forEach((file) => {
          formData.append('images', file)
        })
        toast.promise(uploadImages(formData), {
          loading: 'Uploading images...',
          success: 'Images uploaded successfully',
          error: 'Failed to upload images',
        })
      }
    },
    [uploadImages]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
      'image/webp': ['.webp'],
    },
    multiple: true,
    minSize: 1,
    maxSize: 3 * 1024 * 1024,
    maxFiles: 20,
    noDrag: true,
    noKeyboard: true,
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button>Add image</Button>
    </div>
  )
}

interface ImageListProps {
  images: ExamImage[]
}
const ImageList = ({ images }: ImageListProps) => {
  return (
    <div>
      {images.length === 0 ? (
        <p className="w-full min-h-[40dvh] py-6 flex items-center justify-center">No images found</p>
      ) : (
        <ul>
          {images.map((image) => {
            return (
              <li key={image.id}>
                <img src={getImagePath(image.image_path)} alt={image.image_name} />
                <p>{image.image_name}</p>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default ImagesTab
