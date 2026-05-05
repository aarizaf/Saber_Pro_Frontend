import { useState, useMemo } from 'react';
import type { OptionId, QuizAnswerRecord, QuizSession, SubjectId } from '../types';
import { getQuestionsBySubject } from '../mocks/questions.mock';

interface UseQuizReturn {
  session: QuizSession;
  selectedOptionId: OptionId | null;
  hasAnswered: boolean;
  isLastQuestion: boolean;
  correctCount: number;
  selectOption: (optionId: OptionId) => void;
  confirmAnswer: () => void;
  nextQuestion: () => void;
  restartQuiz: () => void;
}

const buildInitialSession = (subjectId: SubjectId): QuizSession => ({
  subjectId,
  questions: getQuestionsBySubject(subjectId),
  currentIndex: 0,
  answers: [],
  isFinished: false,
});

export const useQuiz = (subjectId: SubjectId): UseQuizReturn => {
  const [session, setSession] = useState<QuizSession>(() => buildInitialSession(subjectId));
  const [selectedOptionId, setSelectedOptionId] = useState<OptionId | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const isLastQuestion = session.currentIndex === session.questions.length - 1;

  const correctCount = useMemo(
    () => session.answers.filter((a) => a.isCorrect).length,
    [session.answers]
  );

  const selectOption = (optionId: OptionId) => {
    if (hasAnswered) return;
    setSelectedOptionId(optionId);
  };

  const confirmAnswer = () => {
    if (!selectedOptionId || hasAnswered) return;
    const currentQuestion = session.questions[session.currentIndex];
    const isCorrect = selectedOptionId === currentQuestion.correctOptionId;
    const record: QuizAnswerRecord = { questionId: currentQuestion.id, selectedOptionId, isCorrect };
    setSession((prev) => ({ ...prev, answers: [...prev.answers, record] }));
    setHasAnswered(true);
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      setSession((prev) => ({ ...prev, isFinished: true }));
    } else {
      setSession((prev) => ({ ...prev, currentIndex: prev.currentIndex + 1 }));
    }
    setSelectedOptionId(null);
    setHasAnswered(false);
  };

  const restartQuiz = () => {
    setSession(buildInitialSession(subjectId));
    setSelectedOptionId(null);
    setHasAnswered(false);
  };

  return { session, selectedOptionId, hasAnswered, isLastQuestion, correctCount, selectOption, confirmAnswer, nextQuestion, restartQuiz };
};
