import React from 'react';
import './PlayerCard.css'; // Import the custom CSS file
import playerImage from './player.png'; // Import the player image

const PlayerCard = ({ player }) => {
  return (
    <div className="card">
      <h5 className="player-name">{player.playerName}</h5> {/* Add player-name class */}
      <div className="card-content">
        <img src={playerImage} alt="Player" className="player-image" /> {/* Include the image */}
        <p className="stat-item">Points: {player.stats.points}</p> {/* Add stat-item class */}
        <p className="stat-item">Assists: {player.stats.assists}</p> {/* Add stat-item class */}
        <p className="stat-item">Rebounds: {player.stats.rebounds}</p> {/* Add stat-item class */}
      </div>
    </div>
  );
};

export default PlayerCard;
