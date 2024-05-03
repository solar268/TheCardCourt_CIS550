import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PlayerCard from '../components/PlayerCard';
import './OpenPackPage.css';
import loading_ball from '../images/spinning_basketball.gif';

const OpenPackPage = () => {
    const [showCards, setShowCards] = useState(false);
    const [playerCards, setPlayerCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenPack = () => {
        setIsLoading(true); 
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
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    };

    const handleSaveCards = () => {
        fetch('http://localhost:8080/save-cards', {
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
