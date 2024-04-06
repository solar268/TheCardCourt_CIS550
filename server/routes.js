const express = require('express');
const mysql = require('mysql')
const config = require('./config.json')

const router = express.Router();

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));

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

// Route to GET a random team
const getRandomTeam = async function (req, res) {
  // Example query to fetch a random team from the Teams table
  connection.query(`
    SELECT *
    FROM Teams
    ORDER BY RAND()
    LIMIT 1
  `, (err, data) => {
    if (err || data.length === 0) {
      // If there's an error querying the database or no data is returned
      console.log(err);
      res.status(500).json({ error: 'Failed to fetch a random team' });
    } else {
      // Successfully fetched a random team, return its details
      // Assuming 'data' is an array of results, and we're interested in the first one
      res.json({
        league_id: data[0].LEAGUE_ID,
        team_id: data[0].TEAM_ID,
        min_year: data[0].MIN_YEAR,
        max_year: data[0].MAX_YEAR,
        abbreviation: data[0].ABBREVIATION,
        nickname: data[0].NICKNAME,
        yearFounded: data[0].YEARFOUNDED,
        city: data[0].CITY,
        arena: data[0].ARENA,
        arenaCapacity: data[0].ARENACAPACITY,
        owner: data[0].OWNER,
        generalManager: data[0].GENERALMANAGER,
        headCoach: data[0].HEADCOACH,
        dLeagueAffiliation: data[0].DLEAGUEAFFILIATION
      });
    }
  });
};

// Add this route handler to your router setup
router.get('/random_team', getRandomTeam);

module.exports = router;
