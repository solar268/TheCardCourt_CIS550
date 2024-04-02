import React, { useState } from 'react';
import PlayerCard from '../components/PlayerCard';
import './HomePage.css';

const HomePage = () => {
  const [showCards, setShowCards] = useState(false);

  // Dummy data
  const playerData1 = {
    playerName: 'Player 1',
    stats: {
      points: 100,
      assists: 32,
      rebounds: 72,
    },
  };

  const playerData2 = {
    playerName: 'Player 2',
    stats: {
      points: 150,
      assists: 98,
      rebounds: 37,
    },
  };

  const playerData3 = {
    playerName: 'Player 3',
    stats: {
      points: 120,
      assists: 82,
      rebounds: 14,
    },
  };

  const handleOpenPack = () => {
    setShowCards(true);
  };

  return (
    <div className="homepage"> 
      <h1>Hello world</h1>
      <button className="button" onClick={handleOpenPack}>Open Pack</button>
      {showCards && (
        <div className="card-container"> 
          <PlayerCard player={playerData1} />
          <PlayerCard player={playerData2} />
          <PlayerCard player={playerData3} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
