import { Modals, useOpenModal } from '@/store/modal'
import { useQuizResultStore } from '@/store/site/quiz-result'
import QuestionItem from './question-item'

const QuestionList = () => {
  const quiz = useQuizResultStore((state) => state.quiz)

  const questionsInfo = useQuizResultStore((state) => state.questionsInfo)

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
        const correctAnswers = questionsInfo ? questionsInfo[item.question_id]?.correctAnswers : []

        return (
          <QuestionItem
            key={item.question_id}
            examId={quiz?.exam.id!}
            index={index}
            question={item}
            correctAnswers={correctAnswers ?? []}
            onPreviewImage={handlePreviewImage}
          />
        )
      })}
    </div>
  )
}

export default QuestionList
