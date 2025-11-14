
import React from 'react';
import { NumberOptionState } from '../types';
import { CheckIcon, CrossIcon, SparkleIcon } from './Icons';

interface NumberOptionProps {
  number: number;
  onClick: () => void;
  state: NumberOptionState;
  disabled: boolean;
}

const stateClasses = {
  [NumberOptionState.Idle]: 'bg-white hover:bg-pink-50 text-purple-600 border-purple-300',
  [NumberOptionState.Correct]: 'bg-green-300 text-green-800 border-green-500 animate-jump',
  [NumberOptionState.Incorrect]: 'bg-red-300 text-red-800 border-red-500 animate-shake',
};

const stateIcons = {
    [NumberOptionState.Correct]: <CheckIcon className="w-12 h-12 text-white" />,
    [NumberOptionState.Incorrect]: <CrossIcon className="w-12 h-12 text-white" />,
    [NumberOptionState.Idle]: null
}

export const NumberOption: React.FC<NumberOptionProps> = ({ number, onClick, state, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || state !== NumberOptionState.Idle}
      className={`relative rounded-2xl w-full aspect-square flex items-center justify-center 
                  font-bold text-6xl md:text-7xl border-4 shadow-lg transition-all 
                  duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 
                  focus:ring-yellow-300 ${stateClasses[state]} 
                  disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none`}
    >
      {state === NumberOptionState.Correct && (
          <>
            <SparkleIcon className="absolute top-0 left-0 w-8 h-8 text-yellow-300 transform -translate-x-1/3 -translate-y-1/3 rotate-12" />
            <SparkleIcon className="absolute bottom-0 right-0 w-10 h-10 text-yellow-300 transform translate-x-1/4 translate-y-1/4 rotate-45" />
            <SparkleIcon className="absolute top-2 right-2 w-6 h-6 text-yellow-300 transform -rotate-12" />
          </>
      )}

      <span className="drop-shadow-sm">{number}</span>
      
      {stateIcons[state] && (
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl flex items-center justify-center">
            {stateIcons[state]}
        </div>
      )}

      <style>{`
        @keyframes jump {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        .animate-jump { animation: jump 0.5s ease-in-out; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </button>
  );
};
