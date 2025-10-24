import { useEffect, useRef, useState } from 'react';

/**
 * カスタムフック：BGM管理
 * Custom hook: BGM management
 * 
 * アプリケーション全体で使用される背景音楽を管理します
 * Manages background music used throughout the application
 */
export const useBGM = (audioSrc: string, volume: number = 0.3) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // オーディオ要素を作成 / Create audio element
    audioRef.current = new Audio(audioSrc);
    audioRef.current.loop = true; // ループ再生 / Loop playback
    audioRef.current.volume = volume; // 音量設定 / Set volume

    // コンポーネントのアンマウント時にクリーンアップ / Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc, volume]);

  // BGMを再生 / Play BGM
  const play = async () => {
    if (audioRef.current && !isPlaying) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('BGM再生エラー / BGM playback error:', error);
      }
    }
  };

  // BGMを一時停止 / Pause BGM
  const pause = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // ミュート切り替え / Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // 音量を設定 / Set volume
  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
    }
  };

  return {
    play,
    pause,
    toggleMute,
    setVolume,
    isPlaying,
    isMuted,
  };
};
