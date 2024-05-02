import React from 'react';
import './PlayerCard.css'; 
import playerImage from './player.png'; 
import bluePlayerImage from './blue_player.png'; 
import redPlayerImage from './red_player.png'; 
import purplePlayerImage from './purple_player.png'; 

const PlayerCard = ({ player }) => {
  const roundToOneDecimal = (num) => {
    return Number(num).toFixed(1);
  };

  const getBorderColor = (rarity) => {
    switch (rarity) {
      case 'gold':
        return 'gold-border';
      case 'silver':
        return 'silver-border';
      case 'bronze':
        return 'bronze-border';
      default:
        return ''; 
    }
  };

  const getBannerColor = (rarity) => {
    switch (rarity) {
      case 'gold':
        return 'gold-banner';
      case 'silver':
        return 'silver-banner';
      case 'bronze':
        return 'bronze-banner';
      default:
        return ''; 
    }
  };

  const getRandomPlayerImage = () => {
    const coloredPlayerImages = [bluePlayerImage, redPlayerImage, purplePlayerImage];
    const randomIndex = Math.floor(Math.random() * coloredPlayerImages.length);
    return coloredPlayerImages[randomIndex];
  };

  // Get the border color based on rarity
  const borderColor = getBorderColor(player.RARITY);
  // Get the banner color based on rarity
  const bannerColor = getBannerColor(player.RARITY);

  const playerImageSrc = getRandomPlayerImage();

  const allRoundStat = Math.round((1 - player.RANKING) * 100);

  return (
    <div className={`card ${borderColor}`}>
      <div className={`banner ${bannerColor}`}>{allRoundStat}</div>
      <h5 className="player-name">{player.PLAYER_NAME}</h5>
      <div className="card-content">
        <img src={playerImageSrc} alt="Player" className="player-image" /> 
        <p className="stat-item">Efficiency: {roundToOneDecimal(player.AVG_EFF)}</p> 
        <p className="stat-item">Points: {roundToOneDecimal(player.AVG_PTS)}</p> 
        <p className="stat-item">Assists: {roundToOneDecimal(player.AVG_AST)}</p> 
        <p className="stat-item">Rebounds: {roundToOneDecimal(player.AVG_REB)}</p> 
      </div>
    </div>
  );
};

export default PlayerCard;
