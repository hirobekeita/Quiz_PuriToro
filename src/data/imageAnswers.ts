/**
 * 各画像の正解データ
 * 画像ごとに正解を「A」または「B」で定義
 * 
 * Image correct answer data
 * Defines the correct answer as "A" or "B" for each image
 */

export interface ImageAnswerData {
  imageId: number;
  correctAnswer: 'A' | 'B';
}

/**
 * 画像の正解マッピング
 * image1.svg から image20.svg までの正解を定義
 * 
 * Image correct answer mapping
 * Defines correct answers for image1.svg through image20.svg
 */
export const IMAGE_ANSWERS: Record<number, 'A' | 'B'> = {
  1: 'A',
  2: 'B',
  3: 'A',
  4: 'B',
  5: 'A',
  6: 'B',
  7: 'A',
  8: 'B',
  9: 'A',
  10: 'B',
  11: 'A',
  12: 'B',
  13: 'A',
  14: 'B',
  15: 'A',
  16: 'B',
  17: 'A',
  18: 'B',
  19: 'A',
  20: 'B',
};

/**
 * 画像番号から正解を取得
 * Get correct answer for an image by its number
 * 
 * @param imageNumber - 画像番号（1〜20）/ Image number (1-20)
 * @returns 正解（A または B）/ Correct answer (A or B)
 */
export const getCorrectAnswer = (imageNumber: number): 'A' | 'B' => {
  return IMAGE_ANSWERS[imageNumber] || 'A';
};
