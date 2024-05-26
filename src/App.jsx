import React, { useEffect, useState } from 'react';
import './App.css';
import PlayerDeck from './PlayerDeck';
import { shuffle } from './utils/shuffle';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [player1Lives, setPlayer1Lives] = useState(5);
  const [player2Lives, setPlayer2Lives] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [player2Deck, setPlayer2Deck] = useState([]);
  const [playComputer, setPlayComputer] = useState(false);

  const distributeCards = () => {
    setPlayer1Deck(shuffle());
    setPlayer2Deck(shuffle());
  };

  const startGame = () => {
    setPlayer1Lives(5);
    setPlayer2Lives(5);
    distributeCards();
    setGameStarted(true);
    setPlayComputer(false);
    setCurrentPlayer(1);
  };

  const startComputerGame = () => {
    setPlayer1Lives(5);
    setPlayer2Lives(5);
    distributeCards();
    setGameStarted(true);
    setPlayComputer(true);
    setCurrentPlayer(1);
  };

  const switchTurn = () => {
    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
  };

  useEffect(() => {
    if (player1Lives === 0) {
      toast.success('Player 2 wins!', { position: 'top-center', duration: 10000 });
      setGameStarted(false);
    } else if (player2Lives === 0) {
      toast.success('Player 1 wins!', { position: 'top-center', duration: 10000 });
      setGameStarted(false);
    }
  }, [player1Lives, player2Lives]);
;

  return (
    <div className="App">
      <Toaster />
      <button onClick={startGame}>Start Game</button>
      {/* <button onClick={startComputerGame}>Play Computer</button> */}
      <PlayerDeck 
        player={1} 
        lives={player1Lives} 
        deck={player1Deck}
        setDeck={setPlayer1Deck}
        opponentDeck={player2Deck}
        setOpponentDeck={setPlayer2Deck}
        setPlayerLives={setPlayer1Lives} 
        opponentLives={player2Lives}
        setOpponentLives={setPlayer2Lives}
        switchTurn={switchTurn} 
        gameStarted={gameStarted} 
        turn={currentPlayer===1}
        isComputer={false}
      />
      <PlayerDeck 
        player={2} 
        lives={player2Lives} 
        deck={player2Deck}
        setDeck={setPlayer2Deck}
        opponentDeck={player1Deck}
        setOpponentDeck={setPlayer1Deck}
        setPlayerLives={setPlayer2Lives} 
        opponentLives={player1Lives}
        setOpponentLives={setPlayer1Lives}
        switchTurn={switchTurn} 
        gameStarted={gameStarted} 
        turn={currentPlayer===2}
        isComputer={playComputer}
      />
    </div>
  );
}

export default App;
