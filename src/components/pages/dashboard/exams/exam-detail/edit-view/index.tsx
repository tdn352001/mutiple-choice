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
            Overview
          </TabsTrigger>
          <TabsTrigger className="min-w-24" value="images">
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="questions">
          <QuestionsTab exam={exam} />
        </TabsContent>
        <TabsContent value="images">
          <ImagesTab exam={exam} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ExamEditView
