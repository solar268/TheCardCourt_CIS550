import React from 'react';
import './PlayerCard.css'; // Import the custom CSS file
import playerImage from './player.png'; // Import the player image

const PlayerCard = ({ player }) => {
  const roundToOneDecimal = (num) => {
    return Number(num).toFixed(1);
  };

  // Function to determine the border color based on rarity
  const getBorderColor = (rarity) => {
    switch (rarity) {
      case 'gold':
        return 'gold-border';
      case 'silver':
        return 'silver-border';
      case 'bronze':
        return 'bronze-border';
      default:
        return ''; // Default border color
    }
  };

  // Function to determine the banner color based on rarity
  const getBannerColor = (rarity) => {
    switch (rarity) {
      case 'gold':
        return 'gold-banner';
      case 'silver':
        return 'silver-banner';
      case 'bronze':
        return 'bronze-banner';
      default:
        return ''; // Default banner color
    }
  };

  // Get the border color based on rarity
  const borderColor = getBorderColor(player.RARITY);
  // Get the banner color based on rarity
  const bannerColor = getBannerColor(player.RARITY);

  const allRoundStat = Math.round((1 - player.RANKING) * 100);

  return (
    <div className={`card ${borderColor}`}>
      <div className={`banner ${bannerColor}`}>{allRoundStat}</div>
      <h5 className="player-name">{player.PLAYER_NAME}</h5>
      <div className="card-content">
        <img src={playerImage} alt="Player" className="player-image" /> 
        <p className="stat-item">Efficiency: {roundToOneDecimal(player.AVG_EFF)}</p> 
        <p className="stat-item">Points: {roundToOneDecimal(player.AVG_PTS)}</p> 
        <p className="stat-item">Assists: {roundToOneDecimal(player.AVG_AST)}</p> 
        <p className="stat-item">Rebounds: {roundToOneDecimal(player.AVG_REB)}</p> 
      </div>
    </div>
  );
};

export default PlayerCard;
