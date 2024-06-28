import SearchBox from '@/components/custom/search-box'
import { FormControl } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetCourseByIdQuery, useGetCoursesQuery } from '@/hooks/services/courses'
import { cn } from '@/lib/utils'
import { Course } from '@/services/courses'
import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CourseSelectProps {
  className?: string
  value?: number
  onValueChange?: (value: number) => void
}

const CourseSelect = ({ className, value, onValueChange }: CourseSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedCourse, setSelectedCourse] = useState<Course>()

  const getCoursesQuery = useGetCoursesQuery(
    {
      search,
      per_page: 100,
      page: 1,
    },
    {
      placeholderData: (prev) => {
        return prev
      },
    }
  )

  const courses = getCoursesQuery.data?.courses || []

  const isMatched = Number(value) === selectedCourse?.id

  const courseQuery = useGetCourseByIdQuery(String(value), {
    enabled: !!value && !isMatched,
  })

  useEffect(() => {
    if (!isMatched && !courseQuery.isPending && courseQuery.data) {
      setSelectedCourse(courseQuery.data.data)
    }
  }, [courseQuery.data, courseQuery.isPending, isMatched])

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const handleSelect = (course: Course) => {
    setSelectedCourse(course)
    onValueChange?.(course.id)
    setSearch(course.course_name)
    setIsOpen(false)
  }

  const { refs, floatingStyles, context } = useFloating<HTMLElement>({
    placement: 'bottom-start',
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({ padding: 10 }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            minWidth: `${rects.reference.width}px`,
          })
        },
        padding: 10,
      }),
    ],
  })

  const click = useClick(context, { event: 'mousedown' })
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'listbox' })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([dismiss, role, click])

  return (
    <div className={cn('relative', className)}>
      <FormControl ref={refs.setReference}>
        <button
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          type="button"
          {...getReferenceProps()}
        >
          <span>{selectedCourse ? selectedCourse.course_name : 'Select a course'}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </FormControl>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              className="z-50 overflow-hidden rounded-md border bg-popover text-popover-foreground left-0 shadow-md shadow-ring/10"
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
              }}
              {...getFloatingProps()}
            >
              <div className="absolute p-1 top-0 z-10 w-full bg-background border-b">
                <SearchBox
                  className="w-full max-w-none [&_input]:border-none"
                  value={search}
                  onChange={handleSearch}
                  onSubmit={handleSearch}
                  placeholder="Search topics by name or code"
                  autoFocus={false}
                />
              </div>
              <div className="pt-12 ">
                <ScrollArea
                  className="w-full"
                  viewportOptions={{
                    className: 'max-h-[min(300px,30dvh)]',
                  }}
                >
                  <div>
                    {courses.length === 0 ? (
                      <p className="w-full py-4 text-sm flex items-center justify-center">No course found.</p>
                    ) : (
                      <div className="p-1">
                        {courses.map((course) => (
                          <button
                            key={course.id}
                            type="button"
                            className={cn(
                              'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground',
                              course.id === value && 'bg-accent text-accent-foreground'
                            )}
                            {...getItemProps({
                              // Handle pointer select.
                              onClick() {
                                handleSelect(course)
                              },
                              // Handle keyboard select.
                              onKeyDown(event) {
                                if (event.key === 'Enter') {
                                  event.preventDefault()
                                  handleSelect(course)
                                }
                              },
                            })}
                          >
                            {course.course_name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  )
}

export default CourseSelect
