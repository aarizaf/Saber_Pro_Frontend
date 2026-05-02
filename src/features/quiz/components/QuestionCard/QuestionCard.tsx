interface QuestionCardProps {
  questionNumber: number;
  statement: string;
}

/**
 * Tarjeta que muestra el enunciado de la pregunta actual.
 */
export const QuestionCard = ({ questionNumber, statement }: QuestionCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
        Pregunta {questionNumber}
      </p>
      <p className="text-gray-900 text-lg font-medium leading-relaxed">{statement}</p>
    </div>
  );
};
