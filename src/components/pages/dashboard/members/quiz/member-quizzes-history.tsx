import MemberQuizHistoryTable from '@/components/tables/member-quiz-history-table'

interface MemberExamHistoryProps {
  memberId: string | number
  examId: string | number
}

const MemberQuizzesHistory = ({ memberId, examId }: MemberExamHistoryProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-center text-xl font-semibold">Exam History</h2>

      <div>
        <MemberQuizHistoryTable memberId={memberId} examId={examId} />
      </div>
    </div>
  )
}

export default MemberQuizzesHistory
