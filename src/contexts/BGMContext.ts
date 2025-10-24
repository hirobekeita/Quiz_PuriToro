import { createContext } from 'react';

export interface BGMContextType {
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
}

export const BGMContext = createContext<BGMContextType | undefined>(undefined);
