import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { ProgressBar } from '../../../../components/ui/ProgressBar/ProgressBar';

interface QuizHeaderProps {
  subjectName: string;
  currentIndex: number;
  totalQuestions: number;
  onBack: () => void;
}

/**
 * Cabecera del quiz: botón de salida, nombre de la materia y barra de avance.
 */
export const QuizHeader = ({
  subjectName,
  currentIndex,
  totalQuestions,
  onBack,
}: QuizHeaderProps) => {
  const progressPct =
    totalQuestions > 0 ? Math.round((currentIndex / totalQuestions) * 100) : 0;

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={onBack}
            aria-label="Volver al inicio"
            className="text-gray-400 hover:text-indigo-600 transition-colors flex-shrink-0"
          >
            <ArrowBackRoundedIcon />
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 truncate">{subjectName}</p>
            <p className="text-xs text-gray-400">
              Pregunta {currentIndex + 1} de {totalQuestions}
            </p>
          </div>
          <span className="text-sm font-bold text-indigo-600 flex-shrink-0">
            {progressPct}%
          </span>
        </div>
        <ProgressBar percentage={progressPct} colorClass="bg-indigo-500" heightClass="h-1.5" />
      </div>
    </div>
  );
};
