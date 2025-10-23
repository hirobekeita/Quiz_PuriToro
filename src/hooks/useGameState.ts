import { useState, useEffect } from 'react';
import type { GameState, QuizAnswer } from '../types';
import { getRandomImages, preloadImages } from '../utils/imageUtils';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentRound: 0,
    answers: [],
    images: [],
    isLoading: true,
  });

  useEffect(() => {
    const initGame = async () => {
      const images = getRandomImages();
      await preloadImages(images);
      setGameState(prev => ({
        ...prev,
        images,
        isLoading: false,
      }));
    };

    initGame();
  }, []);

  const submitAnswer = (answer: 'A' | 'B') => {
    const currentImage = gameState.images[gameState.currentRound];
    const isCorrect = answer === currentImage.correctAnswer;
    
    const newAnswer: QuizAnswer = {
      imageId: currentImage.id,
      answer,
      isCorrect,
    };

    setGameState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      answers: [...prev.answers, newAnswer],
    }));
  };

  const resetGame = () => {
    setGameState({
      currentRound: 0,
      answers: [],
      images: [],
      isLoading: true,
    });
    
    const initGame = async () => {
      const images = getRandomImages();
      await preloadImages(images);
      setGameState(prev => ({
        ...prev,
        images,
        isLoading: false,
      }));
    };

    initGame();
  };

  return {
    gameState,
    submitAnswer,
    resetGame,
  };
};
