import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

interface AnswerFeedbackProps {
  isCorrect: boolean;
  explanation: string;
}

/**
 * Panel de retroalimentación que aparece tras confirmar una respuesta.
 * Muestra si fue correcta/incorrecta y la explicación pedagógica.
 */
export const AnswerFeedback = ({ isCorrect, explanation }: AnswerFeedbackProps) => {
  return (
    <div
      className={`rounded-2xl border p-4 flex gap-3 ${
        isCorrect
          ? 'bg-emerald-50 border-emerald-200'
          : 'bg-red-50 border-red-200'
      }`}
    >
      <div className="flex-shrink-0 mt-0.5">
        {isCorrect ? (
          <CheckCircleOutlineRoundedIcon className="text-emerald-500" />
        ) : (
          <HighlightOffRoundedIcon className="text-red-400" />
        )}
      </div>
      <div>
        <p className={`font-semibold text-sm ${isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
          {isCorrect ? '¡Correcto!' : 'Respuesta incorrecta'}
        </p>
        <div className="flex items-start gap-1.5 mt-2">
          <LightbulbOutlinedIcon fontSize="small" className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600 leading-relaxed">{explanation}</p>
        </div>
      </div>
    </div>
  );
};
