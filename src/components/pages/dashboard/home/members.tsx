'use client'
import LoadingPage from '@/components/templates/loading-page'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetMembersQuery } from '@/hooks/services/members'
import { routers } from '@/lib/constants/routers'
import { OrderParam } from '@/lib/types/query-params'
import Link from 'next/link'

const MembersCard = () => {
  const { data, isPending } = useGetMembersQuery({
    per_page: 6,
    order_by: OrderParam.Desc,
    sort_by: 'id',
  })

  const members = data?.users || []

  return (
    <Card className="col-span-4 md:col-span-3">
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>Recent members</CardTitle>
        <Link className="text-sm transition-opacity hover:opacity-60" href={routers.members}>
          View more
        </Link>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <LoadingPage />
        ) : (
          <>
            {members.length === 0 ? (
              <p>No Data</p>
            ) : (
              <div className=" flex flex-col gap-8">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="uppercase">{member.full_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 mr-2 space-y-1 max-w-[70%]">
                      <p className="text-sm font-medium leading-none whitespace-nowrap text-ellipsis overflow-hidden">
                        {member.full_name}
                      </p>
                      <p className="text-sm text-muted-foreground whitespace-nowrap text-ellipsis overflow-hidden">
                        {member.email}
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-sm">{member.is_admin ? 'Admin' : 'Member'}</div>
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

export default MembersCard
