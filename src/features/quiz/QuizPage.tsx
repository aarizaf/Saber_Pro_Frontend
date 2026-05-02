import { useNavigate, useParams } from 'react-router-dom';
import { useQuiz } from './hooks/useQuiz';
import { QuizHeader } from './components/QuizHeader/QuizHeader';
import { QuestionCard } from './components/QuestionCard/QuestionCard';
import { AnswerOptions } from './components/AnswerOptions/AnswerOptions';
import { AnswerFeedback } from './components/AnswerFeedback/AnswerFeedback';
import { QuizResults } from './components/QuizResults/QuizResults';
import { SUBJECTS } from '../../mocks/subjects.mock';
import type { SubjectId } from '../../types/subject.types';
import type { OptionId } from '../../types/quiz.types';

/**
 * Página de quiz para una materia específica.
 * Lee el subjectId desde la URL y orquesta todos los subcomponentes.
 */
export const QuizPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();

  const subject = SUBJECTS.find((s) => s.id === subjectId);

  const {
    session,
    selectedOptionId,
    hasAnswered,
    isLastQuestion,
    correctCount,
    selectOption,
    confirmAnswer,
    nextQuestion,
    restartQuiz,
  } = useQuiz((subjectId as SubjectId) ?? 'lectura-critica');

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Materia no encontrada.{' '}
        <button className="text-indigo-600 underline ml-1" onClick={() => navigate('/')}>
          Volver
        </button>
      </div>
    );
  }

  if (session.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No hay preguntas disponibles para esta materia todavía.{' '}
        <button className="text-indigo-600 underline ml-1" onClick={() => navigate('/')}>
          Volver
        </button>
      </div>
    );
  }

  if (session.isFinished) {
    return (
      <QuizResults
        subjectName={subject.name}
        correctCount={correctCount}
        totalQuestions={session.questions.length}
        onRestart={restartQuiz}
        onGoHome={() => navigate('/')}
      />
    );
  }

  const currentQuestion = session.questions[session.currentIndex];
  const lastAnswer = session.answers[session.answers.length - 1];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <QuizHeader
        subjectName={subject.name}
        currentIndex={session.currentIndex}
        totalQuestions={session.questions.length}
        onBack={() => navigate('/')}
      />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-4">
        <QuestionCard
          questionNumber={session.currentIndex + 1}
          statement={currentQuestion.statement}
        />

        <AnswerOptions
          options={currentQuestion.options}
          selectedOptionId={selectedOptionId}
          correctOptionId={currentQuestion.correctOptionId}
          hasAnswered={hasAnswered}
          onSelect={(id) => selectOption(id as OptionId)}
        />

        {hasAnswered && lastAnswer && (
          <AnswerFeedback
            isCorrect={lastAnswer.isCorrect}
            explanation={currentQuestion.explanation}
          />
        )}

        {/* Botones de acción */}
        <div className="flex justify-end pt-2">
          {!hasAnswered ? (
            <button
              onClick={confirmAnswer}
              disabled={!selectedOptionId}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Confirmar respuesta
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Ver resultados' : 'Siguiente pregunta →'}
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
