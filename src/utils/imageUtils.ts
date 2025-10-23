import type { QuizImage } from '../types';

const TOTAL_IMAGES = 20;
const QUIZ_IMAGE_COUNT = 10;

export const getAllImagePaths = (): string[] => {
  const images: string[] = [];
  for (let i = 1; i <= TOTAL_IMAGES; i++) {
    images.push(`/images/image${i}.svg`);
  }
  return images;
};

export const getRandomImages = (): QuizImage[] => {
  const allImages = getAllImagePaths();
  const shuffled = [...allImages].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, QUIZ_IMAGE_COUNT);
  
  return selected.map((src, index) => ({
    id: index + 1,
    src,
  }));
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (images: QuizImage[]): Promise<void> => {
  const promises = images.map(image => preloadImage(image.src));
  await Promise.all(promises);
};
