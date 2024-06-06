import { BaseApiQueryParams } from "@/lib/types/query-params";
import { BaseApiResponse } from "@/lib/axios";

type Answer = {
  id: number;
  answer: string;
  is_correct: boolean;
};

type Question = {
  exam_id: number;
  question: string;
  type: string;
  image?: string;
  answer: Answer[];
};

export type GetQuestionsQueryParams = BaseApiQueryParams;

export type GetQuestionsResponseData = {
  questions: Question[];
  meta: {
    current_page: number;
    next_page?: number;
    prev_page?: number;
    total_pages: number;
    total_items: number;
  };
};

export type GetQuestionsResponse = BaseApiResponse<GetQuestionsResponseData>;

export type GetQuestionByIdResponse = {
  data: Question;
};

export type CreateQuestionRequest = {
  exam_id: string;
  question: string;
  type: string;
  image?: string;
  answer: string[];
  correct_answer: string[];
};

export type UpdateQuestionRequest = {
  exam_id: string;
  question: string;
  type: string;
  image?: string;
};

export type CreateAnswerRequest = {
  answer: string;
  is_correct: boolean;
};

export type UpdateAnswerRequest = {
  answer: string;
  is_correct: boolean;
};

export type CreateQuestionFromCsvRequest = {
  questions: File;
  is_replace: boolean;
};
