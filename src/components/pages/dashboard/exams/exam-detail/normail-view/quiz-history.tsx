import QuizHistoryTable from '@/components/tables/quiz-history-table'
import { useGetQuizHistoryQuery } from '@/hooks/services/user'

interface QuizHistoryProps {
  className?: string
  examId: string | number
}

const QuizHistory = ({ examId }: QuizHistoryProps) => {
  const { data } = useGetQuizHistoryQuery(examId)

  const quizHistory = data?.quizzes || []

  if (quizHistory.length === 0) {
    return null
  }

  return (
    <div className="w-full flex flex-col items-center gap-2 mt-10 border-t pt-10">
      <h2 className="text-3xl font-semibold">History</h2>
      <QuizHistoryTable examId={examId} />
    </div>
  )
}

export default QuizHistory
