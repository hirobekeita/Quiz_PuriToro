import { HashRouter, Routes, Route } from 'react-router-dom';
import { BGMProvider } from './hooks/BGMContext';
import TitleScreen from './screens/TitleScreen';
import GameScreen from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen';

function App() {
  return (
    <BGMProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<TitleScreen />} />
          <Route path="/game" element={<GameScreen />} />
          <Route path="/result" element={<ResultScreen />} />
        </Routes>
      </HashRouter>
    </BGMProvider>
  );
}

export default App;
