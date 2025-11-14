import React from 'react';
import { StarIcon } from './Icons';

interface StarTrackerProps {
  count: number;
}

export const StarTracker: React.FC<StarTrackerProps> = ({ count }) => {
  return (
    <div className="absolute top-4 right-4 bg-yellow-300/80 backdrop-blur-sm text-yellow-800 font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-2">
      <StarIcon className="w-8 h-8 text-yellow-500" />
      <span className="text-3xl">{count}</span>
    </div>
  );
};
