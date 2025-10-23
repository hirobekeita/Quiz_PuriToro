export interface QuizImage {
  id: number;
  src: string;
  correctAnswer: 'プリン' | '大トロ'; // 正解（プリン または 大トロ）
}

export interface QuizAnswer {
  imageId: number;
  answer: 'プリン' | '大トロ';
  isCorrect: boolean; // 正解かどうか
}

export interface GameState {
  currentRound: number;
  answers: QuizAnswer[];
  images: QuizImage[];
  isLoading: boolean;
}
