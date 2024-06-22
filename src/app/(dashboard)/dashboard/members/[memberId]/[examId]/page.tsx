import MemberQuizzesPage from '@/components/pages/dashboard/members/quiz'
import { Metadata } from 'next'

interface PageProps {
  params: {
    memberId: string
    examId: string
  }
}

const Page = async ({ params: { memberId, examId } }: PageProps) => {
  return <MemberQuizzesPage memberId={memberId} examId={examId} />
}

export const metadata: Metadata = {
  title: 'History',
}

export default Page
