import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TitleScreen from './screens/TitleScreen';
import GameScreen from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TitleScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/result" element={<ResultScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
