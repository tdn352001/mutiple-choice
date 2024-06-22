import SearchExam from '@/components/search-box/search-exam'
import MemberExamHistoryTable from '@/components/tables/member-exams-history-table'
import { Suspense } from 'react'

interface MemberExamHistoryProps {
  memberId: string | number
}

const MemberExamHistory = ({ memberId }: MemberExamHistoryProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-center text-xl font-semibold">Exam Completed</h2>

      <div>
        <Suspense>
          <SearchExam />
        </Suspense>
        <MemberExamHistoryTable memberId={memberId} />
      </div>
    </div>
  )
}

export default MemberExamHistory
