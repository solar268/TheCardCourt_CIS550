import React, { useState, useEffect } from 'react';
import './ManagementPage.css'; // Import the CSS for this page

const ManagementPage = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = () => {
        fetch('http://localhost:8080/saved-cards')
            .then(response => response.json())
            .then(data => {
                console.log('Received saved cards:', data); // Useful for debugging
                setCards(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleReset = () => {
        fetch('http://localhost:8080/clear-saved-cards', { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                alert(data.message); // Inform the user of the reset
                fetchCards(); // Refresh the cards to show the updated state
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to clear cards.');
            });
    };

    return (
        <div className="management-page">
            <h1>My Saved Cards</h1>
            <div className="management-button-container">
                <button onClick={handleReset} className="reset-button">Reset Saved Cards</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Average Efficiency</th>
                        <th>Average Points</th>
                        <th>Average Rebounds</th>
                        <th>Average Assists</th>
                        <th>Team ID</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.length > 0 ? (
                        cards.map((card, index) => (
                            <tr key={index}>
                                <td>{card.PLAYER_NAME}</td>
                                <td>{parseFloat(card.AVG_EFF).toFixed(2)}</td>
                                <td>{parseFloat(card.AVG_PTS).toFixed(2)}</td>
                                <td>{parseFloat(card.AVG_REB).toFixed(2)}</td>
                                <td>{parseFloat(card.AVG_AST).toFixed(2)}</td>
                                <td>{card.TEAM_ID}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No cards saved.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManagementPage;