import { useLocation, useNavigate } from 'react-router-dom';
import type { QuizAnswer } from '../types';
import './ResultScreen.css';

const ResultScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers as QuizAnswer[] || [];

  const countA = answers.filter(a => a.answer === 'A').length;
  const countB = answers.filter(a => a.answer === 'B').length;

  const handlePlayAgain = () => {
    navigate('/');
  };

  const getResultMessage = () => {
    if (countA > countB) {
      return "You prefer option A! 💙";
    } else if (countB > countA) {
      return "You prefer option B! 💗";
    } else {
      return "You're perfectly balanced! ⚖️";
    }
  };

  const getResultEmoji = () => {
    const percentage = Math.max(countA, countB) / 10;
    if (percentage >= 0.8) return "🌟";
    if (percentage >= 0.6) return "✨";
    return "🎀";
  };

  return (
    <div className="result-screen">
      <div className="result-content">
        <h1 className="result-heading">
          Results {getResultEmoji()}
        </h1>
        
        <div className="result-message">
          {getResultMessage()}
        </div>

        <div className="score-container">
          <div className="score-card">
            <div className="score-label">Option A</div>
            <div className="score-value">{countA}</div>
            <div className="score-bar">
              <div 
                className="score-fill score-fill-a" 
                style={{ width: `${(countA / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="score-card">
            <div className="score-label">Option B</div>
            <div className="score-value">{countB}</div>
            <div className="score-bar">
              <div 
                className="score-fill score-fill-b" 
                style={{ width: `${(countB / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <button className="play-again-button" onClick={handlePlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
