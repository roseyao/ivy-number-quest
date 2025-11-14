import React, { useEffect } from 'react';
import { MiniUnicornIcon } from './Icons';

interface ReinforcementAnimationProps {
  count: number;
  onComplete: () => void;
}

const TOTAL_ANIMATION_DURATION = 8000; // 8 seconds total
const MARCH_DURATION = 6000; // 6 seconds for each unicorn to cross

export const ReinforcementAnimation: React.FC<ReinforcementAnimationProps> = ({ count, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, TOTAL_ANIMATION_DURATION);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const unicorns = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-1/2 left-1/2 w-[200%] aspect-square -translate-x-1/2 animate-rainbow-spin">
          <div className="w-full h-full rounded-full"
            style={{
              background: 'conic-gradient(from 180deg at 50% 50%, #fecaca, #fde68a, #d9f99d, #a5f3fc, #c4b5fd, #f9a8d4, #fecaca)'
            }}>
          </div>
        </div>
         <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>
      </div>

      <div className="relative w-full h-full">
        {count > 0 ? (
          unicorns.map((_, index) => (
            <div
              key={index}
              className="absolute top-0 left-0 w-24 h-24 will-change-transform"
              style={{
                top: `${20 + (index % 6) * 12 + Math.sin(index) * 5}%`,
                animation: `march ${MARCH_DURATION}ms linear forwards`,
                animationDelay: `${index * 800}ms`, // Stagger unicorns
              }}
            >
              <MiniUnicornIcon className="w-full h-full drop-shadow-lg" />
            </div>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center">
             <div className="bg-white/80 p-8 rounded-2xl shadow-xl">
                <h2 className="text-8xl font-bold text-purple-600 drop-shadow-md">0</h2>
                <p className="text-4xl text-pink-500 font-semibold mt-2">Zero! That means none!</p>
             </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes march {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(calc(100vw + 50%)); }
        }
        @keyframes rainbow-spin {
          from { transform: translateX(-50%) rotate(0deg); }
          to { transform: translateX(-50%) rotate(360deg); }
        }
        .animate-rainbow-spin {
          animation: rainbow-spin 20s linear infinite;
        }
      `}</style>
    </div>
  );
};
