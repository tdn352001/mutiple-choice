'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetStatsDashboardQuery } from '@/hooks/services/stats'
import { Layers3, School, SquareMenu, Users } from 'lucide-react'

const StatsCards = () => {
  const { data } = useGetStatsDashboardQuery()

  const courseCount = data?.courses || 0
  const examCount = data?.exams || 0
  const topicCount = data?.topics || 0
  const userCount = data?.users || 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          <School className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{courseCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Topics</CardTitle>
          <Layers3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topicCount}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
          <SquareMenu className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{examCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userCount}</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatsCards
