import React, { useState } from 'react';
import PlayerCard from '../components/PlayerCard';
import './HomePage.css';

const HomePage = () => {
  const [showCards, setShowCards] = useState(false);
  const [playerCards, setPlayerCards] = useState([]);

  const handleOpenPack = () => {
    fetch('http://localhost:8080/players/all_stats')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Received data:', data); // Check the data received in the console
        setPlayerCards(data);
        setShowCards(true);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Add any additional error handling as needed
      });
  };

  return (
    <div className="homepage">
      <h1>Craft your Dream NBA Team</h1>
      <button className="button" onClick={handleOpenPack}>Open Pack</button>
      {showCards && (
        <div className="card-container">
          <div className="cards-wrapper">
            {playerCards.map(player => (
              <PlayerCard key={player.PLAYER_ID} player={player} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};



export default HomePage;
