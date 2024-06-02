import SearchBox from '@/components/custom/search-box'
import { FormControl } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetTopicByIdQuery, useGetTopicsByCourseQuery } from '@/hooks/services/topics'
import { cn } from '@/lib/utils'
import { Topic } from '@/services/topics'
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
  courseId?: string | number
  value?: number
  onValueChange?: (value: number) => void
}

const TopicSelect = ({ className, courseId, value, onValueChange }: CourseSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedTopic, setSelectedTopic] = useState<Topic>()
  const [enabledFetchTopic, setEnableFetchTopic] = useState(true)
  console.log({ courseId })

  const getTopicsQuery = useGetTopicsByCourseQuery(
    courseId!,
    {
      search,
      per_page: 100,
      page: 1,
    },
    {
      enabled: !!courseId,
      placeholderData: (prev) => {
        return prev
      },
    }
  )

  const topics = getTopicsQuery.data?.topics || []

  const isMatched = Number(value) === selectedTopic?.id

  const topicQuery = useGetTopicByIdQuery(String(value), {
    enabled: enabledFetchTopic && !!value,
  })

  useEffect(() => {
    const topic = topicQuery.data?.data
    if (topic) {
      setSelectedTopic(topic)
      setEnableFetchTopic(false)
    }
  }, [topicQuery.data])

  useEffect(() => {
    if (selectedTopic?.course_id !== courseId) {
      setSelectedTopic(undefined)
      setEnableFetchTopic(true)
    }
  }, [selectedTopic, courseId, value])

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const handleSelect = (topic: Topic) => {
    onValueChange?.(topic.id)
    setSelectedTopic(topic)
    setSearch(topic.topic_name)
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
          disabled={!courseId}
          {...getReferenceProps()}
        >
          {courseId ? (
            <span>{selectedTopic ? selectedTopic.topic_name : 'Select a course'}</span>
          ) : (
            <span>Select a course first</span>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </FormControl>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              className="z-50 overflow-hidden rounded-md border bg-popover text-popover-foreground left-0 shadow-lg"
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
              <div className="pt-12">
                <ScrollArea className="w-full max-h-[min(300px,30dvh)]">
                  <div>
                    {topics.length === 0 ? (
                      <p className="w-full py-4 text-sm flex items-center justify-center">No topic found.</p>
                    ) : (
                      <div className="p-1">
                        {topics.map((topic) => (
                          <button
                            key={topic.id}
                            type="button"
                            className={cn(
                              'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground',
                              topic.id === value && 'bg-accent text-accent-foreground'
                            )}
                            {...getItemProps({
                              // Handle pointer select.
                              onClick() {
                                handleSelect(topic)
                              },
                              // Handle keyboard select.
                              onKeyDown(event) {
                                if (event.key === 'Enter') {
                                  event.preventDefault()
                                  handleSelect(topic)
                                }
                              },
                            })}
                          >
                            {topic.topic_name}
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

export default TopicSelect
