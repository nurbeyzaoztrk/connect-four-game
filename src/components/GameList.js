// components/GameList.js

import React, { useEffect, useState } from 'react';

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // localStorage'dan oyun listesini çek
    const storedGames = JSON.parse(localStorage.getItem('gameList')) || [];
    setGames(storedGames);
  }, [games]); // games state'i değiştiğinde useEffect'i tetikle

  return (
    <div>
      <h1>Game List</h1>
      {games.length > 0 ? (
        <ul>
          {games.map((game, index) => (
            <li key={index}>{game}</li>
          ))}
        </ul>
      ) : (
        <p>Oyun bulunamadı.</p>
      )}
    </div>
  );
};

export default GameList;
