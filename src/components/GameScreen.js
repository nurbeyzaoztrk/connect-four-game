import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GameScreen = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [userColor, setUserColor] = useState(localStorage.getItem('userColor'));
  const [boardColor, setBoardColor] = useState(localStorage.getItem('boardColor'));
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);

  function createEmptyBoard() {
    const rows = 6;
    const cols = 7;
    return Array.from({ length: rows }, () => Array(cols).fill(0));
  }

  const dropDisk = (col) => {
    if (winner) {
      return;
    }

    const updatedBoard = [...board];
    for (let row = 5; row >= 0; row--) {
      if (updatedBoard[row][col] === 0) {
        updatedBoard[row][col] = currentPlayer;
        break;
      }
    }

    if (checkForWinner(updatedBoard)) {
      setWinner(currentPlayer);
    } else if (checkForTie(updatedBoard)) {
      setWinner(0); // 0, beraberlik durumunu temsil eder.
    } else {
      setCurrentPlayer(3 - currentPlayer); // Switch players (1 -> 2, 2 -> 1)
      if (currentPlayer === 1) {
        // Player made a move, now let the computer play
        setTimeout(() => makeComputerMove(updatedBoard), 500);
      }
    }

    setBoard(updatedBoard);
  };

  const makeComputerMove = (board) => {
    const availableColumns = [];
    for (let col = 0; col < 7; col++) {
      if (board[0][col] === 0) {
        availableColumns.push(col);
      }
    }

    if (availableColumns.length === 0) {
      // No available moves, probably a tie
      setWinner(0); // 0, beraberlik durumunu temsil eder.
      return;
    }

    const randomColumn = availableColumns[Math.floor(Math.random() * availableColumns.length)];

    for (let row = 5; row >= 0; row--) {
      if (board[row][randomColumn] === 0) {
        board[row][randomColumn] = 2; // Assuming computer is player 2
        break;
      }
    }

    if (checkForWinner(board)) {
      setWinner(2); // Computer wins
    } else if (checkForTie(board)) {
      setWinner(0); // 0, beraberlik durumunu temsil eder.
    }

    setCurrentPlayer(1); // Switch back to the player
  };

  const checkForWinner = (board) => {
    // Check horizontally
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          board[row][col] !== 0 &&
          board[row][col] === board[row][col + 1] &&
          board[row][col] === board[row][col + 2] &&
          board[row][col] === board[row][col + 3]
        ) {
          return board[row][col];
        }
      }
    }

    // Check vertically
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 7; col++) {
        if (
          board[row][col] !== 0 &&
          board[row][col] === board[row + 1][col] &&
          board[row][col] === board[row + 2][col] &&
          board[row][col] === board[row + 3][col]
        ) {
          return board[row][col];
        }
      }
    }

    // Check diagonally (top-left to bottom-right)
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          board[row][col] !== 0 &&
          board[row][col] === board[row + 1][col + 1] &&
          board[row][col] === board[row + 2][col + 2] &&
          board[row][col] === board[row + 3][col + 3]
        ) {
          return board[row][col];
        }
      }
    }

    // Check diagonally (bottom-left to top-right)
    for (let row = 3; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          board[row][col] !== 0 &&
          board[row][col] === board[row - 1][col + 1] &&
          board[row][col] === board[row - 2][col + 2] &&
          board[row][col] === board[row - 3][col + 3]
        ) {
          return board[row][col];
        }
      }
    }

    // No winner found
    return false;
  };

  const checkForTie = (board) => {
    // Check if the board is full
    const isBoardFull = board.every((row) => row.every((cell) => cell !== 0));

    // Check if there is no winner
    const noWinner = !checkForWinner(board);

    // If the board is full and there is no winner, it's a tie
    return isBoardFull && noWinner;
  };

  useEffect(() => {
    if (winner === 0) {
      // Beraberlik durumu
      setBoard(createEmptyBoard());
      setCurrentPlayer(1);
      // Sayfayı yenile
      window.location.reload();
    } else if (winner && winner !== 0) {
      // Kazanan var
      navigate('/GameScreen');
    }
  }, [winner, navigate]);

  const colors = {
    Player1: userColor,
    Player2: 'black',
    bgColor: boardColor,
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: "#fff",
  };

  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 50px)',
    gridGap: '5px',
    marginTop: '20px',
  };

  const cellStyle = {
    width: '50px',
    height: '50px',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h2>Oyun Ekranı</h2>
      <p>{`Sıradaki Oyuncu: ${currentPlayer === 1 ? userName : 'Bilgisayar'}`}</p>
      <div style={boardStyle}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{ ...cellStyle, backgroundColor: colors.bgColor }}
              onClick={() => dropDisk(colIndex)}
            >
              {cell !== 0 && (
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: cell === 1 ? colors.Player1 : colors.Player2,
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>
      {winner && winner !== 0 && <p>{`Oyuncu ${winner === 1 ? userName : 'Bilgisayar'} kazandı!`}</p>}
      {winner === 0 && <p> Oyun berabere bitti!</p>}
    </div>
  );
};

export default GameScreen;
