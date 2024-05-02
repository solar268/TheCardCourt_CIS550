import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PlayerCard from '../components/PlayerCard';
import './OpenPackPage.css'; // Create and use specific styles for this page

const OpenPackPage = () => {
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
                setPlayerCards(data);
                setShowCards(true);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleSaveCards = () => {
        fetch('http://localhost:8080/save-cards', { // Match this endpoint with your server configuration
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cards: playerCards })
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
            <div className="button-container">
                <button className="button" onClick={handleOpenPack}>Open Pack</button>
                {showCards && (
                    <button className="button" onClick={handleSaveCards}>Save Cards</button>
                )}
            </div>
            {showCards && (
                <div className="card-container">
                    <div className="cards-wrapper">
                        {playerCards.map(player => (
                            <PlayerCard key={player.PLAYER_ID} player={player} />
                        ))}
                    </div>
                </div>
            )}
            <Link to="/" className="back-button">Go Back to Homepage</Link>
        </div>
    );
};

export default OpenPackPage;
