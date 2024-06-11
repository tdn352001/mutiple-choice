import SearchQuestions from '@/components/search-box/search-quetstions'
import QuestionTable from '@/components/tables/question-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Exam } from '@/services/exams'
import { Modals, useOpenModal } from '@/store/modal'
import { useState } from 'react'

interface QuestionsTabProps {
  exam: Exam
}

const QuestionsTab = ({ exam }: QuestionsTabProps) => {
  const [search, setSearch] = useState('')

  const openModal = useOpenModal(Modals.ADD_QUESTION)

  return (
    <div>
      <div className="flex flex-col-reverse items-start gap-2 md:flex-row md:justify-between md:items-center">
        <SearchQuestions search={search} setSearch={setSearch} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Add question</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="items-center" onClick={() => openModal({ examId: exam.id, type: 'file' })}>
              From Csv
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="items-center" onClick={() => openModal({ examId: exam.id, type: 'manually' })}>
              Manually
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <QuestionTable search={search} examId={exam.id} />
    </div>
  )
}

export default QuestionsTab
