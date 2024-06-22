'use client'

import Breadcrumb from '@/components/custom/breadcrumb'
import MemberQuizzesHistory from '@/components/pages/dashboard/members/quiz/member-quizzes-history'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import LoadingPage from '@/components/templates/loading-page'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetMemberQuizzesQuery } from '@/hooks/services/members'
import { memberBreadcrumb } from '@/lib/breadcrumb/course'
import { dynamicRouters, routers } from '@/lib/constants/routers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

interface MemberQuizzesProps {
  memberId: string | number
  examId: string | number
}

const MemberQuizzesPage = ({ memberId, examId }: MemberQuizzesProps) => {
  const { data, isPending, isError } = useGetMemberQuizzesQuery({
    exam_id: examId,
    user_id: memberId,
  })

  const router = useRouter()

  useEffect(() => {
    if (isError) {
      toast.error('Failed to get data')
      router.replace(routers.courses)
    }
  }, [isError, router])

  if (isPending || !data) {
    return <LoadingPage />
  }

  const { user, exam } = data

  return (
    <ScrollArea className="size-full">
      <Container>
        <Breadcrumb
          items={[
            ...memberBreadcrumb,
            {
              title: user.full_name,
              href: dynamicRouters.memberById(user.id),
            },
            {
              title: exam.exam_name,
              href: '#',
            },
          ]}
        />
        <Heading title={`${user.full_name} Profile`} />
        <div className=" space-y-8">
          <div>
            <p className="text-lg ">
              <span className="font-medium">Exam: </span>
              <span>{exam.exam_name}</span>
            </p>
            <p className="text-lg ">
              <span className="font-medium">Member: </span>
              <span>{user.full_name}</span>
            </p>
          </div>
          <MemberQuizzesHistory memberId={user.id} examId={exam.id} />
        </div>
      </Container>
    </ScrollArea>
  )
}

export default MemberQuizzesPage
