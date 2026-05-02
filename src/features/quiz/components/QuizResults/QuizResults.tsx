import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

interface QuizResultsProps {
  subjectName: string;
  correctCount: number;
  totalQuestions: number;
  onRestart: () => void;
  onGoHome: () => void;
}

const getPerformanceLabel = (pct: number): { text: string; color: string } => {
  if (pct >= 80) return { text: '¡Excelente resultado!', color: 'text-emerald-600' };
  if (pct >= 60) return { text: 'Buen trabajo', color: 'text-indigo-600' };
  if (pct >= 40) return { text: 'Puedes mejorar', color: 'text-amber-500' };
  return { text: 'Sigue practicando', color: 'text-red-500' };
};

/**
 * Pantalla de resultados al finalizar el quiz.
 * Muestra puntaje, calificación y opciones de continuar.
 */
export const QuizResults = ({
  subjectName,
  correctCount,
  totalQuestions,
  onRestart,
  onGoHome,
}: QuizResultsProps) => {
  const pct = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const { text: performanceText, color: performanceColor } = getPerformanceLabel(pct);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-md w-full text-center">
        {/* Ícono */}
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
          <EmojiEventsOutlinedIcon className="text-indigo-500" style={{ fontSize: 32 }} />
        </div>

        {/* Título */}
        <h2 className="text-xl font-bold text-gray-900 mb-1">Quiz finalizado</h2>
        <p className="text-sm text-gray-400 mb-6">{subjectName}</p>

        {/* Puntaje */}
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 mb-4">
          <p className="text-6xl font-extrabold text-indigo-600 mb-1">{pct}%</p>
          <p className={`text-sm font-semibold ${performanceColor}`}>{performanceText}</p>
          <p className="text-gray-400 text-xs mt-2">
            {correctCount} de {totalQuestions} respuestas correctas
          </p>
        </div>

        {/* Desglose por franja */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
            <p className="text-2xl font-bold text-emerald-600">{correctCount}</p>
            <p className="text-xs text-emerald-500">Correctas</p>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-xl p-3">
            <p className="text-2xl font-bold text-red-500">{totalQuestions - correctCount}</p>
            <p className="text-xs text-red-400">Incorrectas</p>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            <ReplayRoundedIcon fontSize="small" />
            Intentar de nuevo
          </button>
          <button
            onClick={onGoHome}
            className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-3 rounded-xl transition-colors"
          >
            <HomeRoundedIcon fontSize="small" />
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};
