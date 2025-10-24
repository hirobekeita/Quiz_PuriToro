import { useLocation, useNavigate } from 'react-router-dom';
import type { QuizAnswer } from '../types';
import BGMControl from './BGMControl';
import './ResultScreen.css';

const ResultScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers as QuizAnswer[] || [];

  // 正解数をカウント / Count correct answers
  const correctCount = answers.filter(a => a.isCorrect).length;

  const handlePlayAgain = () => {
    navigate('/');
  };

  /**
   * スコアに基づいて結果メッセージを取得
   * Get result message based on score
   * 9-10: よくできました (Well done)
   * 8以下: 頑張りましょう (Let's try harder)
   */
  const getResultMessage = () => {
    if (correctCount >= 9) {
      return "にゃいすー👍";
    } else {
      return "やりにゃおしー💢";
    }
  };

  /**
   * スコアに基づいて結果画像の絵文字を取得
   * Get result emoji based on score
   * 9-10: よくできました (Well done) - 🌟
   * 8以下: 頑張りましょう (Try harder) - 🌟�
   */
  const getResultEmoji = () => {
    if (correctCount >= 9) return "🌟";
    return "🌟";
  };

  /**
   * スコアに基づいて猫の画像を取得
   * Get cat image based on score
   * 9-10: よくできました (Well done) - high-score.jpg
   * 8以下: 頑張りましょう (Try harder) - low-score.jpg
   */
  const getCatImage = () => {
    if (correctCount >= 9) return "/images/results/high-score.jpg";
    return "/images/results/low-score.jpg";
  };

  return (
    <div className="result-screen">
      <div className="result-content">

        <h1 className="result-heading">
          結果発表 {getResultEmoji()}
        </h1>
        
        {/* Cat mascot with conditional image */}
        <div className="result-cat-mascot">
          <img src={getCatImage()} alt="Result cat" className="cat-image" />
        </div>

        <div className="result-message">
          {getResultMessage()}
        </div>

        {/* Correct answers display */}
        <div className="correct-score-display">
          <div className="paw-icon">🐾</div>
          <div className="correct-label">正解数</div>
          <div className="correct-value">{correctCount} / 10</div>
          <div className="paw-icon">🐾</div>
        </div>

        <button className="play-again-button" onClick={handlePlayAgain}>
          <span className="button-paw">🐾</span>
          もう一度プレイ
          <span className="button-paw">🐾</span>
        </button>
      </div>
      
      <BGMControl />
    </div>
  );
};

export default ResultScreen;
