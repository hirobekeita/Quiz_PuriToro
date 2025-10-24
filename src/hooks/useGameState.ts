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
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const initGame = async () => {
      const images = getRandomImages();
      
      // Start a timeout to show game even if images are slow to load
      const timeoutId = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          images,
          isLoading: false,
        }));
        setLoadingProgress(100);
      }, 8000); // 8 second maximum wait time
      
      try {
        // Simulate progress update
        const progressInterval = setInterval(() => {
          setLoadingProgress(prev => Math.min(prev + 10, 90));
        }, 500);
        
        await preloadImages(images);
        clearInterval(progressInterval);
        clearTimeout(timeoutId);
        setLoadingProgress(100);
        setGameState(prev => ({
          ...prev,
          images,
          isLoading: false,
        }));
      } catch (error) {
        console.error('Error preloading images:', error);
        clearTimeout(timeoutId);
        setLoadingProgress(100);
        // Still show the game even if preload fails
        setGameState(prev => ({
          ...prev,
          images,
          isLoading: false,
        }));
      }
    };

    initGame();
  }, []);

  const submitAnswer = (answer: 'プリン' | '大トロ') => {
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
    setLoadingProgress(0);
    
    const initGame = async () => {
      const images = getRandomImages();
      
      // Start a timeout to show game even if images are slow to load
      const timeoutId = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          images,
          isLoading: false,
        }));
        setLoadingProgress(100);
      }, 8000); // 8 second maximum wait time
      
      try {
        // Simulate progress update
        const progressInterval = setInterval(() => {
          setLoadingProgress(prev => Math.min(prev + 10, 90));
        }, 500);
        
        await preloadImages(images);
        clearInterval(progressInterval);
        clearTimeout(timeoutId);
        setLoadingProgress(100);
        setGameState(prev => ({
          ...prev,
          images,
          isLoading: false,
        }));
      } catch (error) {
        console.error('Error preloading images:', error);
        clearTimeout(timeoutId);
        setLoadingProgress(100);
        // Still show the game even if preload fails
        setGameState(prev => ({
          ...prev,
          images,
          isLoading: false,
        }));
      }
    };

    initGame();
  };

  return {
    gameState,
    loadingProgress,
    submitAnswer,
    resetGame,
  };
};
