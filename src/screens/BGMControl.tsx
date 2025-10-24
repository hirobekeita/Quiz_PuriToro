import { useBGMContext } from '../hooks/useBGMContext';
import './BGMControl.css';

/**
 * BGM制御コンポーネント
 * BGM control component
 * 
 * BGMの再生/停止、ミュート切り替えを行うボタンを表示
 * Displays buttons for BGM play/stop and mute toggle
 */
const BGMControl = () => {
  const { isMuted, toggleMute } = useBGMContext();

  return (
    <div className="bgm-control">
      <button 
        className="bgm-button" 
        onClick={toggleMute}
        aria-label={isMuted ? "BGMをオンにする" : "BGMをミュートする"}
      >
        {isMuted ? '🔇' : '🎵'}
      </button>
    </div>
  );
};

export default BGMControl;
