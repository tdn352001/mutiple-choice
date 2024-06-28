import IncompleteExamsTable from '@/components/tables/incomplete-exams-table'

const IncompleteExams = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-center text-xl font-semibold">Incomplete Exams</h2>
      <div>
        <IncompleteExamsTable />
      </div>
    </div>
  )
}

export default IncompleteExams
