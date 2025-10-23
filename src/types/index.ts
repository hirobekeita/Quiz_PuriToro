export interface QuizImage {
  id: number;
  src: string;
}

export interface QuizAnswer {
  imageId: number;
  answer: 'A' | 'B';
}

export interface GameState {
  currentRound: number;
  answers: QuizAnswer[];
  images: QuizImage[];
  isLoading: boolean;
}
