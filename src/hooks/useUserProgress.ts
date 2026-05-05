import { useState, useMemo } from 'react';
import type { SubjectId, SubjectProgress, UserProgress, UserStats } from '../types';
import { MOCK_USER_PROGRESS, MOCK_USER_STATS } from '../mocks/data.mock';

interface UseUserProgressReturn {
  userProgress: UserProgress;
  stats: UserStats;
  getSubjectProgress: (subjectId: SubjectId) => SubjectProgress;
  overallCompletionPct: number;
  overallAccuracyPct: number;
}

export const useUserProgress = (): UseUserProgressReturn => {
  const [userProgress] = useState<UserProgress>(MOCK_USER_PROGRESS);
  const [stats] = useState<UserStats>(MOCK_USER_STATS);

  const overallCompletionPct = useMemo(() => {
    const values = Object.values(userProgress.subjects);
    const totalCompleted = values.reduce((acc, s) => acc + s.completedQuestions, 0);
    const totalQuestions = values.reduce((acc, s) => acc + s.totalQuestions, 0);
    if (totalQuestions === 0) return 0;
    return Math.round((totalCompleted / totalQuestions) * 100);
  }, [userProgress]);

  const overallAccuracyPct = useMemo(() => {
    const values = Object.values(userProgress.subjects);
    const totalCorrect = values.reduce((acc, s) => acc + s.correctAnswers, 0);
    const totalCompleted = values.reduce((acc, s) => acc + s.completedQuestions, 0);
    if (totalCompleted === 0) return 0;
    return Math.round((totalCorrect / totalCompleted) * 100);
  }, [userProgress]);

  const getSubjectProgress = (subjectId: SubjectId): SubjectProgress =>
    userProgress.subjects[subjectId];

  return { userProgress, stats, getSubjectProgress, overallCompletionPct, overallAccuracyPct };
};
