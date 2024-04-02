const express = require('express');

const router = express.Router();

// Function to create a player card
const createPlayerCard = async (req, res) => {
  const { playerName, stats } = req.body;

  if (!playerName || !stats || !stats.points) {
    res.status(400).json({ error: 'Invalid player data' });
    return;
  }

  const playerCard = {
    playerName,
    stats,
  };

  res.status(200).json(playerCard);
};

router.post('/create_player_card', createPlayerCard);

module.exports = router;
