import React, { useState } from 'react';

const GameScreen = () => {
  // Kullanıcı bilgileri ve oyun bilgileri için state
  const [userName, setUserName] = useState('');
  const [userColor, setUserColor] = useState('');
  const [gameName, setGameName] = useState('');
  const [boardColor, setBoardColor] = useState('');

  // Yeni oyun oluşturma fonksiyonu
  const createGame = () => {
    // Burada yeni oyun oluşturma işlemleri yapılabilir
    // Örneğin, sunucu ile iletişim kurmak, oyun durumunu güncellemek, vb.
    console.log('Yeni oyun oluşturuldu:', {
      userName,
      userColor,
      gameName,
      boardColor,
    });
  };

  return (
    <div>
      <h2>Oyun Oluşturma Ekranı</h2>
      <form>
        <label>
          Kullanıcı Adı:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Kullanıcı Rengi:
          <input
            type="text"
            value={userColor}
            onChange={(e) => setUserColor(e.target.value)}
          />
        </label>
        <br />
        <label>
          Tahta Rengi:
          <input
            type="text"
            value={boardColor}
            onChange={(e) => setBoardColor(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={createGame}>
          Oyunu Oluştur
        </button>
      </form>
    </div>
  );
};

export default GameScreen;
