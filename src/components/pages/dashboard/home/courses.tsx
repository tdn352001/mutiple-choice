'use client'
import LoadingPage from '@/components/templates/loading-page'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetCoursesQuery } from '@/hooks/services/courses'
import { dynamicRouters, routers } from '@/lib/constants/routers'
import { OrderParam } from '@/lib/types/query-params'
import Link from 'next/link'

const CoursesCard = () => {
  const { data, isPending } = useGetCoursesQuery({
    per_page: 6,
    order_by: OrderParam.Desc,
    sort_by: 'id',
  })

  const courses = data?.courses || []

  return (
    <Card className="col-span-4">
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>Recent courses</CardTitle>
        <Link className="text-sm transition-opacity hover:opacity-60" href={routers.courses}>
          View more
        </Link>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <LoadingPage />
        ) : (
          <>
            {courses.length === 0 ? (
              <p>No Data</p>
            ) : (
              <div className="divide-y-2 flex flex-col">
                {courses.map((course) => (
                  <div key={course.id} className="py-5 flex justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium line-clamp-3">{course.course_name}</p>
                    </div>
                    <Link
                      className="text-sm transition-opacity hover:opacity-60"
                      href={dynamicRouters.courseById(course.id)}
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default CoursesCard
