import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GameCreationScreen from './components/GameCreate';
import GameList from './components/GameList';
import GameScreen from './components/GameScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/GameCreate" />} />
        <Route path="/GameCreate" element={<GameCreationScreen />} />
        <Route path="/GameList" element={<GameList />} />
        <Route path="/GameScreen" element={<GameScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
