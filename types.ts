export enum GameState {
  Start = 'start',
  LevelSelect = 'levelSelect',
  Playing = 'playing',
  Reinforcement = 'reinforcement',
  Celebration = 'celebration',
}

export enum NumberOptionState {
  Idle = 'idle',
  Correct = 'correct',
  Incorrect = 'incorrect',
}

export interface Level {
  range: [number, number];
}
