import SearchExam from '@/components/search-box/search-exam'
import ExamsHistoryTable from '@/components/tables/exams-history-table'
import { Suspense } from 'react'

const ExamHistory = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-center text-xl font-semibold">Exam History</h2>

      <div>
        <Suspense>
          <SearchExam />
        </Suspense>
        <ExamsHistoryTable />
      </div>
    </div>
  )
}

export default ExamHistory
