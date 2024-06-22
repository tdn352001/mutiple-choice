import SearchUserByExam from '@/components/search-box/search-user-by-exam'
import UserByExamTable from '@/components/tables/user-exam-history-table'
import { Exam } from '@/services/exams'
import { useState } from 'react'

interface ExamStatsViewProps {
  exam: Exam
}

const ExamStatsView = ({ exam }: ExamStatsViewProps) => {
  const [search, setSearch] = useState('')

  return (
    <div className="w-full flex flex-col items-center gap-2 ">
      <h2 className="text-3xl font-semibold">Exam Completion List</h2>
      <div className="w-full pt-10">
        <SearchUserByExam search={search} setSearch={setSearch} />
        <UserByExamTable exam={exam} search={search} />
      </div>
    </div>
  )
}

export default ExamStatsView
