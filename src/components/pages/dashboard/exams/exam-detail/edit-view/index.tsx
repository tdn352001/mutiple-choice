import { DeleteImageModal } from '@/components/modals/image/delete-image-modal'
import { AddQuestionModal } from '@/components/modals/question/add-questions'
import { DeleteQuestionModal } from '@/components/modals/question/delete-question-modal'
import { EditQuestionModal } from '@/components/modals/question/edit-question-modal'
import { ViewQuestionModal } from '@/components/modals/question/view-question-modal'
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
      <EditQuestionModal />
      <DeleteQuestionModal />
      <DeleteImageModal />
      <ViewQuestionModal />
    </div>
  )
}

export default ExamEditView
