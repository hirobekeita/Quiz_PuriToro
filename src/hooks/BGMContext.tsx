import { useEffect, useRef, useState, type ReactNode } from 'react';
import { BGMContext } from '../contexts/BGMContext';
import { CatBGMGenerator } from '../utils/bgmGenerator';

interface BGMProviderProps {
  children: ReactNode;
}

export const BGMProvider = ({ children }: BGMProviderProps) => {
  const bgmGeneratorRef = useRef<CatBGMGenerator | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // BGMジェネレーターの初期化 / Initialize BGM generator
    bgmGeneratorRef.current = new CatBGMGenerator();

    // 自動再生を試みる（ユーザーインタラクション後に再生される）
    // Attempt autoplay (will play after user interaction)
    const initBGM = () => {
      if (bgmGeneratorRef.current) {
        bgmGeneratorRef.current.start();
        setIsPlaying(true);
      }
    };

    // ユーザーインタラクションをリッスン / Listen for user interaction
    const handleInteraction = () => {
      initBGM();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    // クリーンアップ / Cleanup
    return () => {
      if (bgmGeneratorRef.current) {
        bgmGeneratorRef.current.cleanup();
      }
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (bgmGeneratorRef.current) {
      if (isPlaying) {
        bgmGeneratorRef.current.stop();
        setIsPlaying(false);
      } else {
        bgmGeneratorRef.current.start();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (bgmGeneratorRef.current) {
      bgmGeneratorRef.current.toggleMute();
      setIsMuted(!isMuted);
    }
  };

  const setVolume = (volume: number) => {
    if (bgmGeneratorRef.current) {
      bgmGeneratorRef.current.setVolume(volume);
    }
  };

  return (
    <BGMContext.Provider value={{ isPlaying, isMuted, togglePlay, toggleMute, setVolume }}>
      {children}
    </BGMContext.Provider>
  );
};


