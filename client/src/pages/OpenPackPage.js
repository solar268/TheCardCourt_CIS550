import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PlayerCard from '../components/PlayerCard';
import './OpenPackPage.css';
import loading_ball from '../images/spinning_basketball.gif';

const OpenPackPage = () => {
    const [showCards, setShowCards] = useState(false);
    const [playerCards, setPlayerCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenPack = async () => {
        setIsLoading(true);
        try {
            // Fetch random player IDs first
            const response = await fetch('http://localhost:8080/players/get_random_players');
            if (!response.ok) throw new Error('Failed to fetch random players');
            const players = await response.json();
            const playerIds = players.map(player => player.PLAYER_ID).join(',');
    
            // function to fetch data from a specific endpoint
            const fetchStats = async (endpoint) => {
                const statsResponse = await fetch(`http://localhost:8080/players/${endpoint}?player_ids=${playerIds}`);
                if (!statsResponse.ok) throw new Error(`Failed to fetch ${endpoint}`);
                return statsResponse.json();
            };  

            // const fetchTeamStats = async (endpoint) => {
            //     const statsResponse = await fetch(`http://localhost:8080/teams/${endpoint}?player_ids=${playerIds}`);
            //     if (!statsResponse.ok) throw new Error(`Failed to fetch ${endpoint}`);
            //     return statsResponse.json();
            // };

            // fetch data for player
            // const rarity = await fetchStats('rarities');
            const ranking = await fetchStats('all_stats');
            const efficiency = await fetchStats('efficiency');
            const offensive = await fetchStats('offensive_stats');
            const defensive = await fetchStats('defensive_stats');
            const teamwork = await fetchStats('teamwork_stats');
            const currentTeam = await fetchStats('current_team');
            
            // // fetch data for team
            // const teamLegacy = await fetchTeamStats('get_team_legacy'); // need to change split out different fetch for this
            // const homecourtAdvantage = await fetchTeamStats('get_team_legacy');

            // combine all results
            const combinedData = players.map(player => {
                const playerData = {
                    ...ranking.find(rnk => rnk.PLAYER_ID === player.PLAYER_ID),
                    ...efficiency.find(e => e.PLAYER_ID === player.PLAYER_ID),
                    ...offensive.find(o => o.PLAYER_ID === player.PLAYER_ID),
                    ...defensive.find(d => d.PLAYER_ID === player.PLAYER_ID),
                    ...teamwork.find(t => t.PLAYER_ID === player.PLAYER_ID),
                    ...currentTeam.find(ct => ct.PLAYER_ID === player.PLAYER_ID),
                };
            

                // if efficiency is NaN, set to null to later remove
                if (isNaN(playerData.AVG_EFF)) {
                    return null;
                }
                return playerData;
            }).filter(Boolean);

            // update player cards and set loading false
            setPlayerCards(combinedData);
            setShowCards(true);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching data:', error);
        } 
    };

    const handleSaveCards = () => { 
        const cardsToSave = playerCards.map(player => ({
            PLAYER_ID: player.PLAYER_ID,
            PLAYER_NAME: player.PLAYER_NAME,
            AVG_EFF: player.AVG_EFF,
            '3pt_rank': player['3pt_rank'],
            fg_rank: player.fg_rank,
            defensive_rank: player.defensive_rank,
            assist_rank: player.assist_rank,
            NICKNAME: player.NICKNAME,
          }));
        fetch('http://localhost:8080/save-cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cards: cardsToSave })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert('Cards have been saved successfully!');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to save cards.');
            });
    };

    return (
        <div className="open-pack-page">
            <h1>Craft your Dream NBA Team</h1>
            <div className="home-button-container">
                <button className="open-pack-button" onClick={handleOpenPack}>Open Pack</button>
                {showCards && (
                    <button className="save-card-button" onClick={handleSaveCards}>Save Cards</button>
                )}
                <Link to="/management">
                    <button className="open-pack-button">Card Management Page</button>
                </Link>
            </div>
            {isLoading && <img src={loading_ball} alt="Loading" className="loading-icon" />}
            {showCards && (
                <div className="open-pack-card-container">
                    <div className="open-pack-cards-wrapper">
                        {playerCards.map(player => (
                            <PlayerCard key={player.PLAYER_ID} player={player} />
                        ))}
                    </div>
                </div>
            )}
            <Link to="/">
                <button className="management-home-button">Back to Home</button>
            </Link>
        </div>
    );
};

export default OpenPackPage;
