'use client'
import { useGetCourseByIdQuuery } from '@/hooks/services/courses'

const CourseDetailPage = ({ id }: { id: string }) => {
  const { data } = useGetCourseByIdQuuery(id)

  return <div>{JSON.stringify(data)}</div>
}

export default CourseDetailPage
