import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import GameCreationScreen from './components/GameCreate';
import GameList from './components/GameList';
import GameScreen from './components/GameScreen';

const App = () => {
  const [gameCreated, setGameCreated] = useState(false);

  const handleGameCreated = () => {
    setGameCreated(true);
  };

  return (
    <Router>
      <Denetim />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={gameCreated ? '/GameScreen' : '/GameCreate'} />}
        />
        <Route
          path="/GameCreate"
          element={<GameCreationScreen onGameCreated={handleGameCreated} />}
        />
        <Route path="/GameList" element={<GameList />} />
        <Route path="/GameScreen" element={<GameScreen />} />
      </Routes>
    </Router>
  );
};

export default App;

const Denetim = () => {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState('');

  useEffect(() => {
    // Sayfa değiştiğinde veya sayfa tekrar yüklendiğinde logla
    if (location.pathname !== previousPath || performance.navigation.type === 1) {
      console.log("Bir önceki sayfa: " + previousPath);
      setPreviousPath(location.pathname);

      // Sayfa tekrar yüklendiğinde ayrı bir log yap
      if (performance.navigation.type === 1) {
        console.log("Sayfa tekrar yüklendi");
      }
    }
  }, [location.pathname, previousPath]);

  return null;
};
