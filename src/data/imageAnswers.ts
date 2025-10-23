/**
 * 各画像の正解データ
 * 画像ごとに正解を「A」または「B」で定義
 * 
 * Image correct answer data
 * Defines the correct answer as "A" or "B" for each image
 */

export interface ImageAnswerData {
  imageId: number;
  correctAnswer: 'プリン' | '大トロ';
}

/**
 * 画像の正解マッピング
 * image1.svg から image20.svg までの正解を定義
 * 
 * Image correct answer mapping
 * Defines correct answers for image1.svg through image20.svg
 */
export const IMAGE_ANSWERS: Record<number, 'プリン' | '大トロ'> = {
  1: 'プリン',
  2: 'プリン',
  3: 'プリン',
  4: 'プリン',
  5: 'プリン',
  6: 'プリン',
  7: '大トロ',
  8: '大トロ',
  9: '大トロ',
  10: '大トロ',
  11: '大トロ',
  12: '大トロ',
  13: '大トロ',
};

/**
 * 画像番号から正解を取得
 * Get correct answer for an image by its number
 * 
 * @param imageNumber - 画像番号（1〜20）/ Image number (1-20)
 * @returns 正解（A または B）/ Correct answer (A or B)
 */
export const getCorrectAnswer = (imageNumber: number): 'プリン' | '大トロ' => {
  return IMAGE_ANSWERS[imageNumber] || 'プリン';
};
