import { AddQuestionModal } from '@/components/modals/question/add-questions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Exam } from '@/services/exams'
import ImagesTab from './images-tab'
import QuestionsTab from './questions-tab'

interface ExamEditViewProps {
  exam: Exam
}

const ExamEditView = ({ exam }: ExamEditViewProps) => {
  return (
    <div>
      <Tabs defaultValue="questions" className="space-y-4">
        <TabsList>
          <TabsTrigger className="min-w-24" value="questions">
            Questions
          </TabsTrigger>
          <TabsTrigger className="min-w-24" value="images">
            Images
          </TabsTrigger>
        </TabsList>
        <TabsContent value="questions">
          <QuestionsTab exam={exam} />
        </TabsContent>
        <TabsContent value="images">
          <ImagesTab exam={exam} />
        </TabsContent>
      </Tabs>
      <AddQuestionModal />
    </div>
  )
}

export default ExamEditView
