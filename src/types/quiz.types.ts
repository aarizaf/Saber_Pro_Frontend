import type { SubjectId } from './subject.types';

export type OptionId = 'A' | 'B' | 'C' | 'D';

export interface QuizOption {
  id: OptionId;
  text: string;
}

export interface QuizQuestion {
  id: string;
  subjectId: SubjectId;
  statement: string;
  options: QuizOption[];
  correctOptionId: OptionId;
  explanation: string;
}

export type AnswerStatus = 'unanswered' | 'correct' | 'incorrect';

export interface QuizAnswerRecord {
  questionId: string;
  selectedOptionId: OptionId;
  isCorrect: boolean;
}

export interface QuizSession {
  subjectId: SubjectId;
  questions: QuizQuestion[];
  currentIndex: number;
  answers: QuizAnswerRecord[];
  isFinished: boolean;
}
