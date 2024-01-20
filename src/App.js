import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GameCreationScreen from './components/GameCerate.js';  // GameCreate yazım hatası düzeltildi
import GameList from './components/GameList';
import GameScreen from './components/GamaScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/GameCreation" />} />
        <Route path="/GameCreation" element={<GameCreationScreen />} />
        <Route path="/game/list" element={<GameList />} />
        <Route path="/game/screen" element={<GameScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
