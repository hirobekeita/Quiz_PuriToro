import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllImagePaths } from '../utils/imageUtils';
import BGMControl from './BGMControl';
import { soundEffectPlayer } from '../utils/soundEffects';
import './TitleScreen.css';

const TitleScreen = () => {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    // タイトル画面用にランダムな画像を選択
    // Select a random image for the title screen
    const images = getAllImagePaths();
    const randomImage = images[Math.floor(Math.random() * images.length)];
    
    // Preload the background image
    const img = new Image();
    img.onload = () => {
      setBackgroundImage(randomImage);
    };
    img.onerror = () => {
      console.warn('Failed to load background image');
      // Still set the image path, browser will handle the loading
      setBackgroundImage(randomImage);
    };
    img.src = randomImage;
  }, []);

  const handleStart = () => {
    // 猫の鳴き声SE再生 / Play cat meow sound effect
    soundEffectPlayer.playButtonClick();
    navigate('/game');
  };

  return (
    <div className="title-screen">
      {/* Background image overlay */}
      {backgroundImage && (
        <div className="title-background-overlay">
          <img src={backgroundImage} alt="Background" className="title-background-image" />
        </div>
      )}
      
      <div className="title-content">
        {/* Cat ears decoration */}
        <div className="title-cat-ears">
          <div className="title-cat-ear title-cat-ear-left">◢</div>
          <div className="title-cat-ear title-cat-ear-right">◣</div>
        </div>

        <h1 className="title-heading">
          🐾 クイズ！ぷりとろ！ 🐾
        </h1>
        <h2 className="title-heading-en">
          Quiz PuriToro
        </h2>
        <p className="title-subtitle">
          10問の画像が提示されます。<br />
          それがプリンか大トロか当ててください。にゃん。
        </p>
        
        {/* Cat mascot */}
        <div className="title-cat-mascot">
          <span className="title-cat-face">🍮🍣</span>
        </div>

        <button className="start-button" onClick={handleStart}>
          <span className="button-paw">🐾</span>
          スタート
          <span className="button-paw">🐾</span>
        </button>
      </div>
      
      <BGMControl />
    </div>
  );
};

export default TitleScreen;
