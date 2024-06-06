import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Exam } from '@/services/exams'
interface ExamNormalViewProps {
  exam: Exam
}

const ExamNormalView = ({ exam }: ExamNormalViewProps) => {
  return (
    <div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger className="min-w-24" value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger className="min-w-24" value="analytics" disabled>
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7"></div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ExamNormalView
