export interface QuizImage {
  id: number;
  src: string;
  correctAnswer: 'A' | 'B'; // 正解（A または B）
}

export interface QuizAnswer {
  imageId: number;
  answer: 'A' | 'B';
  isCorrect: boolean; // 正解かどうか
}

export interface GameState {
  currentRound: number;
  answers: QuizAnswer[];
  images: QuizImage[];
  isLoading: boolean;
}
