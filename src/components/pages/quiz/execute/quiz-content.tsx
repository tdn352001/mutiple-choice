import QuestionItem from '@/components/pages/quiz/execute/question-item'
import { QuizFormValue } from '@/components/pages/quiz/execute/type'
import { Button } from '@/components/ui/button'
import { Modals, useOpenModal } from '@/store/modal'
import { useQuizStore } from '@/store/site/quiz'
import { UseFormReturn } from 'react-hook-form'

interface QuizFormContentProps {
  form: UseFormReturn<QuizFormValue>
}

const QuizFormContent = ({ form }: QuizFormContentProps) => {
  const quiz = useQuizStore((state) => state.quiz)
  const questions = quiz?.questions_log || []

  const openPreviewModal = useOpenModal(Modals.PREVIEW_IMAGE)

  const handlePreviewImage = (url: string) => {
    openPreviewModal({
      imageUrl: url,
    })
  }

  return (
    <div className="flex flex-col">
      {questions.map((item, index) => {
        return (
          <QuestionItem
            key={item.question_id}
            examId={quiz?.exam.id!}
            index={index}
            question={item}
            form={form}
            onPreviewImage={handlePreviewImage}
          />
        )
      })}

      <Button className="ml-auto lg:hidden" form="quiz-form">
        Submit
      </Button>
    </div>
  )
}

export default QuizFormContent
