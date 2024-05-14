'use client'

import SearchBox from '@/components/custom/search-box'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useDeleteCourseMutation, useGetCoursesQuery } from '@/hooks/services/courses'
import { cn } from '@/lib/utils'
import { Course } from '@/services/courses'
import { Modals, useModalStore } from '@/store/modal'
import { useQueryClient } from '@tanstack/react-query'
import { ChevronsUpDown } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

export function DeleteCourseModal() {
  const open = useModalStore((state) => state.modal.DELETE_COURSE?.open)
  const course = useModalStore.getState().modal.DELETE_COURSE?.data?.course

  const closeModal = useModalStore((state) => state.closeModal)

  const [search, setSearch] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')

  const { data, isPending } = useGetCoursesQuery(
    { search },
    {
      enabled: !!open,
    }
  )

  const { mutateAsync: deleteCourse, isPending: isDeleting } = useDeleteCourseMutation(course?.id.toString() || '')

  const [courses, setCourses] = useState(data?.courses || [])

  const queryClient = useQueryClient()

  const handleDeleteCourse = async () => {
    const params = selectedCourse ? { new_course_id: selectedCourse } : undefined

    return deleteCourse(params).then(() => {
      handleCloseModal(false)
      queryClient.invalidateQueries({
        queryKey: ['courses'],
      })
    })
  }

  const handleCloseModal = useCallback(
    (open: boolean) => {
      if (!open) {
        closeModal(Modals.DELETE_COURSE)
        setSearch('')
        setSelectedCourse('')
      }
    },
    [closeModal]
  )

  useEffect(() => {
    if (!isPending) {
      setCourses(data?.courses || [])
    }
  }, [data, isPending])

  return (
    <>
      {/* {open && <div className="fixed inset-0 z-50 bg-black/80 !mt-0"></div>} */}
      <Dialog open={open} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the course <strong>{course?.course_name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <CourseCombobox
                courses={courses}
                value={selectedCourse}
                onChange={setSelectedCourse}
                search={search}
                onSearch={setSearch}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleCloseModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive" onClick={handleDeleteCourse}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

type CourseComboboxProps = {
  courses: Course[]
  value: string
  onChange: (value: string) => void
  search: string
  onSearch: (search: string) => void
}

const CourseCombobox = ({ courses, value, onChange, search, onSearch }: CourseComboboxProps) => {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value
            ? courses.find((course) => course.id.toString() === value)?.course_name
            : 'Choose course to move data to...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[278px] sm:w-[375px] p-0">
        <div className="flex w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground">
          <SearchBox
            className="px-2 py-1 text-muted-foreground [&>svg]:size-5 [&>input]:pl-7 [&>input]:border-none "
            value={search}
            onChange={onSearch}
            onSubmit={onSearch}
            placeholder="Search courses by name or code"
          />
          <Separator />
          <ScrollArea
            className="w-full h-full max-h-[200px]"
            viewportOptions={{
              className: 'max-h-[200px]',
            }}
          >
            <div className="">
              {courses.length === 0 ? (
                <p className="py-6 text-center text-sm">No courses found</p>
              ) : (
                <div className="w-full flex flex-col gap-1 p-1">
                  {courses.map((item) => (
                    <button
                      key={item.id}
                      className={cn(
                        'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground',
                        item.id.toString() === value && '!bg-accent !text-accent-foreground'
                      )}
                      disabled={item.id.toString() === value}
                      onClick={() => {
                        onChange(item.id.toString())
                        onSearch('')
                        setOpen(false)
                      }}
                    >
                      <span className="block max-[200px] sm:max-w-[300px] overflow-hidden whitespace-nowrap text-ellipsis ">
                        {item.course_name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}
