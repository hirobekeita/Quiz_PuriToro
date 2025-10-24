import type { QuizImage } from '../types';
import { getCorrectAnswer } from '../data/imageAnswers';

const TOTAL_IMAGES = 13;
const QUIZ_IMAGE_COUNT = 10;

/**
 * すべての画像パスを取得
 * Get all image paths
 */
export const getAllImagePaths = (): string[] => {
  const images: string[] = [];
  for (let i = 1; i <= TOTAL_IMAGES; i++) {
    images.push(`/images/image${i}.jpg`);
  }
  return images;
};

/**
 * ランダムに10枚の画像を選択（正解付き）
 * Select 10 random images with correct answers
 */
export const getRandomImages = (): QuizImage[] => {
  const allImages = getAllImagePaths();
  const shuffled = [...allImages].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, QUIZ_IMAGE_COUNT);
  
  return selected.map((src, index) => {
    // 画像ファイル名から番号を抽出（例: "/images/image5.jpg" -> 5）
    // Extract image number from filename (e.g., "/images/image5.jpg" -> 5)
    const match = src.match(/image(\d+)\.jpg/);
    const imageNumber = match ? parseInt(match[1], 10) : 1;
    
    return {
      id: index + 1,
      src,
      correctAnswer: getCorrectAnswer(imageNumber),
    };
  });
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => {
      console.warn(`Failed to preload image: ${src}`);
      // Resolve anyway to not block the loading
      resolve();
    };
    img.src = src;
  });
};

export const preloadImages = async (images: QuizImage[]): Promise<void> => {
  const promises = images.map(image => preloadImage(image.src));
  await Promise.allSettled(promises);
};
