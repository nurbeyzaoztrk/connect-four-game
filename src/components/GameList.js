import React, { useEffect, useState } from 'react';

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // localStorage'dan oyun listesini çek
    const storedGames = JSON.parse(localStorage.getItem('gameList')) || [];
    setGames(storedGames);
  }, []); // Sadece component ilk render olduğunda çalışması için boş dependency array kullanıldı

  return (
    <div>
      <h1>Game List</h1>
      {games.length > 0 ? (
        <ul>
          {games.map((game, index) => (
            <li key={index}>
              <strong>User Name:</strong> {game.userName}, &nbsp;
              <strong>Game Name:</strong> {game.gameName}, &nbsp;
              <strong>User Color:</strong> {game.userColor}, &nbsp;
              <strong>Board Color:</strong> {game.boardColor}
            </li>
          ))}
        </ul>
      ) : (
        <p>Oyun bulunamadı.</p>
      )}
    </div>
  );
};

export default GameList;
