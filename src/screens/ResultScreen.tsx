import { useLocation, useNavigate } from 'react-router-dom';
import type { QuizAnswer } from '../types';
import './ResultScreen.css';

const ResultScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers as QuizAnswer[] || [];

  // 正解数をカウント / Count correct answers
  const correctCount = answers.filter(a => a.isCorrect).length;
  const countA = answers.filter(a => a.answer === 'A').length;
  const countB = answers.filter(a => a.answer === 'B').length;

  const handlePlayAgain = () => {
    navigate('/');
  };

  /**
   * スコアに基づいて結果メッセージを取得
   * Get result message based on score
   */
  const getResultMessage = () => {
    if (correctCount === 10) {
      return "パーフェクト！全問正解にゃ！🎉 Perfect score, meow!";
    } else if (correctCount >= 8) {
      return "すごいにゃ！ほぼ完璧にゃん！😸 Amazing, almost purrfect!";
    } else if (correctCount >= 6) {
      return "よくできたにゃ！😺 Well done, meow!";
    } else if (correctCount >= 4) {
      return "まあまあにゃん 🐱 Not bad!";
    } else {
      return "次は頑張るにゃ！😿 Better luck next time, meow!";
    }
  };

  /**
   * スコアに基づいて結果画像の絵文字を取得
   * Get result emoji based on score
   */
  const getResultEmoji = () => {
    if (correctCount === 10) return "🏆";
    if (correctCount >= 8) return "🌟";
    if (correctCount >= 6) return "✨";
    if (correctCount >= 4) return "🎀";
    return "💝";
  };

  /**
   * スコアに基づいて猫の画像を取得
   * Get cat image based on score
   */
  const getCatImage = () => {
    if (correctCount === 10) return "😻"; // Heart eyes cat
    if (correctCount >= 8) return "😸"; // Grinning cat
    if (correctCount >= 6) return "😺"; // Smiling cat
    if (correctCount >= 4) return "🐱"; // Cat face
    return "😿"; // Crying cat
  };

  return (
    <div className="result-screen">
      <div className="result-content">
        {/* Cat ears decoration */}
        <div className="cat-ears">
          <div className="cat-ear cat-ear-left">◢</div>
          <div className="cat-ear cat-ear-right">◣</div>
        </div>

        <h1 className="result-heading">
          結果発表 {getResultEmoji()}
        </h1>
        
        {/* Cat mascot with conditional image */}
        <div className="result-cat-mascot">
          <span className="cat-face">{getCatImage()}</span>
        </div>

        <div className="result-message">
          {getResultMessage()}
        </div>

        {/* Correct answers display */}
        <div className="correct-score-display">
          <div className="paw-icon">🐾</div>
          <div className="correct-label">正解数 / Correct Answers</div>
          <div className="correct-value">{correctCount} / 10</div>
          <div className="paw-icon">🐾</div>
        </div>

        <div className="score-container">
          <div className="score-card">
            <div className="score-label">選択 A / Option A</div>
            <div className="score-value">{countA}</div>
            <div className="score-bar">
              <div 
                className="score-fill score-fill-a" 
                style={{ width: `${(countA / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="score-card">
            <div className="score-label">選択 B / Option B</div>
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
          <span className="button-paw">🐾</span>
          もう一度プレイ / Play Again
          <span className="button-paw">🐾</span>
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
