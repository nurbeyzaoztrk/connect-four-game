// GameCreate.js
import React, { useState, useEffect } from 'react';
import './GameCreate.css';
import { useNavigate } from 'react-router-dom';

const GameCreate = ({ onGameCreated }) => {
  const [userName, setUserName] = useState('');
  const [userColor, setUserColor] = useState(localStorage.getItem('userColor') || '#ff5733');
  const [boardColor, setBoardColor] = useState(localStorage.getItem('boardColor') || '#33ff57');
  const [gameName, setGameName] = useState(localStorage.getItem('gameName') || '');
  const navigate = useNavigate();

  useEffect(() => {
    // Save selected values to local storage whenever they change
    localStorage.setItem('userColor', userColor);
    localStorage.setItem('boardColor', boardColor);
    localStorage.setItem('userName', userName);
    localStorage.setItem('gameName', gameName);
  }, [userColor, boardColor, userName, gameName]);

  const createGame = () => {
    if (!userName || !gameName) {
      // Kullanıcı adı veya oyun adı girilmediyse uyarı göster ve işlemi durdur
      alert("Please enter username and game name. ");
      return;
    }

    console.log('Yeni oyun oluşturuldu:', {
      userName,
      userColor,
      boardColor,
      gameName,
    });

    // Navigate to the GameScreen after creating the game, passing the user name as state
    navigate('/GameScreen', { state: { userName } });

    // Call the onGameCreated function to update the App state
    onGameCreated();
  };

  const backgroundImageUrl = '/bg.png';

  return (
    <div style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', height: '100vh', display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="yarı-saydam-div">
        <center>
          <h2>game creation screen</h2>
          <form>
            <label>
              User Name:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Game Nameı:
              <input
                type="text"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
              />
            </label>
            <br />
            <label>
              User Color:
              <input
                type="color"
                value={userColor}
                onChange={(e) => setUserColor(e.target.value)}
              />
            </label>
            <br />
            <label>
              Board Color:
              <input
                type="color"
                value={boardColor}
                onChange={(e) => setBoardColor(e.target.value)}
              />
            </label>
            <br />
            <button type="button" onClick={createGame}>
            create the game 
            </button>
          </form>
        </center>
      </div>
    </div>
  );
};

export default GameCreate;
