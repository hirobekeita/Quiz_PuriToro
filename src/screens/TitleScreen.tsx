import { useNavigate } from 'react-router-dom';
import './TitleScreen.css';

const TitleScreen = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/game');
  };

  return (
    <div className="title-screen">
      <div className="title-content">
        <h1 className="title-heading">🌸 Quiz PuriToro 🌸</h1>
        <p className="title-subtitle">Choose your favorite for 10 rounds!</p>
        <button className="start-button" onClick={handleStart}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default TitleScreen;
