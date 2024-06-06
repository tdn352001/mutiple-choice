type Answer = {
  id: number
  answer: string
  is_correct: boolean
}

type Question = {
  exam_id: number
  question: string
  type: string
  image?: string
  answer: Answer[]
}
