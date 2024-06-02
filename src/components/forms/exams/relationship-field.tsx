import CourseSelect from '@/components/forms/topics/course-select'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ExamSchema } from '@/lib/schemas/exams'
import { useEffect, useRef } from 'react'
import { UseFormReturn } from 'react-hook-form'
import TopicSelect from './topic-select'

interface RelationShipFieldProps {
  form: UseFormReturn<ExamSchema>
}

const RelationShipField = ({ form }: RelationShipFieldProps) => {
  const courseId = form.watch('course_id')
  const courseRef = useRef(courseId)

  useEffect(() => {
    if (courseId !== courseRef.current) {
      form.resetField('topic_id')
      courseRef.current = courseId
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId])

  return (
    <>
      <FormField
        control={form.control}
        name="course_id"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <CourseSelect onValueChange={field.onChange} value={field.value} />
              <FormMessage />
            </FormItem>
          )
        }}
      />
      <FormField
        control={form.control}
        name="topic_id"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <TopicSelect courseId={courseId} onValueChange={field.onChange} value={field.value} />
              <FormMessage />
            </FormItem>
          )
        }}
      />
    </>
  )
}

export default RelationShipField
