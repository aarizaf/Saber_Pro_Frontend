import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import type { OptionId, QuizOption } from '../types';

interface AnswerOptionsProps {
  options: QuizOption[];
  selectedOptionId: OptionId | null;
  correctOptionId: OptionId;
  hasAnswered: boolean;
  onSelect: (id: OptionId) => void;
}

const getOptionStyle = (
  optionId: OptionId,
  selectedOptionId: OptionId | null,
  correctOptionId: OptionId,
  hasAnswered: boolean
): string => {
  const base =
    'w-full flex items-center gap-3 text-left rounded-xl border-2 px-4 py-3.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1';

  if (!hasAnswered) {
    return selectedOptionId === optionId
      ? `${base} border-indigo-500 bg-indigo-50 text-indigo-700 font-medium`
      : `${base} border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer`;
  }

  if (optionId === correctOptionId) return `${base} border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold`;
  if (optionId === selectedOptionId) return `${base} border-red-400 bg-red-50 text-red-700 font-medium`;
  return `${base} border-gray-200 bg-gray-50 text-gray-400 opacity-60`;
};

const OptionIcon = ({
  optionId,
  selectedOptionId,
  correctOptionId,
  hasAnswered,
}: {
  optionId: OptionId;
  selectedOptionId: OptionId | null;
  correctOptionId: OptionId;
  hasAnswered: boolean;
}) => {
  if (!hasAnswered) {
    return (
      <RadioButtonUncheckedRoundedIcon
        fontSize="small"
        className={selectedOptionId === optionId ? 'text-indigo-500' : 'text-gray-300'}
      />
    );
  }
  if (optionId === correctOptionId) return <CheckCircleRoundedIcon fontSize="small" className="text-emerald-500" />;
  if (optionId === selectedOptionId) return <CancelRoundedIcon fontSize="small" className="text-red-400" />;
  return <RadioButtonUncheckedRoundedIcon fontSize="small" className="text-gray-300" />;
};

export const AnswerOptions = ({ options, selectedOptionId, correctOptionId, hasAnswered, onSelect }: AnswerOptionsProps) => {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <button
          key={option.id}
          disabled={hasAnswered}
          onClick={() => onSelect(option.id)}
          className={getOptionStyle(option.id, selectedOptionId, correctOptionId, hasAnswered)}
          aria-pressed={selectedOptionId === option.id}
        >
          <OptionIcon
            optionId={option.id}
            selectedOptionId={selectedOptionId}
            correctOptionId={correctOptionId}
            hasAnswered={hasAnswered}
          />
          <span className="text-sm leading-snug">
            <span className="font-bold mr-2">{option.id}.</span>
            {option.text}
          </span>
        </button>
      ))}
    </div>
  );
};
