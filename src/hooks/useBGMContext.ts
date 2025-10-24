import { useContext } from 'react';
import { BGMContext } from '../contexts/BGMContext';

export const useBGMContext = () => {
  const context = useContext(BGMContext);
  if (!context) {
    throw new Error('useBGMContext must be used within BGMProvider');
  }
  return context;
};
