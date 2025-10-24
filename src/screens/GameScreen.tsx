import { useNavigate } from 'react-router-dom';
import { useGameState } from '../hooks/useGameState';
import BGMControl from './BGMControl';
import { soundEffectPlayer } from '../utils/soundEffects';
import './GameScreen.css';

const GameScreen = () => {
  const navigate = useNavigate();
  const { gameState, submitAnswer } = useGameState();

  const handleAnswer = (answer: 'プリン' | '大トロ') => {
    // 猫の鳴き声SE再生 / Play cat meow sound effect
    soundEffectPlayer.playButtonClick();
    
    const currentImage = gameState.images[gameState.currentRound];
    const isCorrect = answer === currentImage.correctAnswer;
    
    submitAnswer(answer);
    
    if (gameState.currentRound + 1 >= 10) {
      setTimeout(() => {
        navigate('/result', { 
          state: { 
            answers: [...gameState.answers, { 
              imageId: currentImage.id, 
              answer,
              isCorrect 
            }] 
          } 
        });
      }, 300);
    }
  };

  if (gameState.isLoading) {
    return (
      <div className="game-screen loading">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Loading images...</p>
        </div>
      </div>
    );
  }

  if (gameState.currentRound >= 10) {
    return (
      <div className="game-screen loading">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Calculating results...</p>
        </div>
      </div>
    );
  }

  const currentImage = gameState.images[gameState.currentRound];

  return (
    <div className="game-screen">
      <div className="game-content">
        <div className="progress-bar">
          <div className="progress-text">
            Round {gameState.currentRound + 1} / 10
          </div>
          <div className="progress-container">
            <div 
              className="progress-fill" 
              style={{ width: `${((gameState.currentRound + 1) / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="image-container">
          <img 
            src={currentImage.src} 
            alt={`Quiz ${gameState.currentRound + 1}`}
            className="quiz-image"
          />
        </div>

        <div className="question-text">
          どっちでしょう?
        </div>

        <div className="button-container">
          <button 
            className="answer-button button-a" 
            onClick={() => handleAnswer('プリン')}
          >
            プリン
          </button>
          <button 
            className="answer-button button-b" 
            onClick={() => handleAnswer('大トロ')}
          >
            大トロ
          </button>
        </div>
      </div>
      
      <BGMControl />
    </div>
  );
};

export default GameScreen;
