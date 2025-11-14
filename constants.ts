import { Level } from './types';

export const LEVELS: Level[] = [
  { range: [0, 10] },
  { range: [11, 20] },
  { range: [21, 30] },
  { range: [10, 30] }, // Mix it up
  { range: [31, 50] },
  { range: [0, 50] }, // Final review
];
