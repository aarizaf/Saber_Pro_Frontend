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

export const QuizResults = ({ subjectName, correctCount, totalQuestions, onRestart, onGoHome }: QuizResultsProps) => {
  const pct = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const { text: performanceText, color: performanceColor } = getPerformanceLabel(pct);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
          <EmojiEventsOutlinedIcon className="text-indigo-500" style={{ fontSize: 32 }} />
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-1">Quiz finalizado</h2>
        <p className="text-sm text-gray-400 mb-6">{subjectName}</p>

        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 mb-4">
          <p className="text-6xl font-extrabold text-indigo-600 mb-1">{pct}%</p>
          <p className={`text-sm font-semibold ${performanceColor}`}>{performanceText}</p>
          <p className="text-gray-400 text-xs mt-2">
            {correctCount} de {totalQuestions} respuestas correctas
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onGoHome}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-semibold px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <HomeRoundedIcon fontSize="small" />
            Inicio
          </button>
          <button
            onClick={onRestart}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-3 rounded-xl transition-colors"
          >
            <ReplayRoundedIcon fontSize="small" />
            Reintentar
          </button>
        </div>
      </div>
    </div>
  );
};
