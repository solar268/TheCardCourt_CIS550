const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));

app.use(bodyParser.json());

// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js
app.get('/players/card', routes.playerCard);
app.get('/teams/random', routes.randomTeam);
app.get('/players/efficiency', routes.playerEfficiency);
app.get('/players/rarities', routes.playerRarity);
app.get('/teams/highest_scorers', routes.highestScorers);
app.get('/teams/ratings', routes.teamRatings);
app.get('/players/stats_rankings', routes.playerStatsRankings);
app.get('/players/scores', routes.playerScores);
app.get('/managers/scores', routes.managerScores);
app.get('/teams/homecourt_advantage', routes.homecourtAdvantage);
app.get('/players/transfers', routes.playerTransfers);
app.get('/teams/transfers', routes.teamTransfers);
app.get('/players/all_stats', routes.allPlayerStats); 


app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
