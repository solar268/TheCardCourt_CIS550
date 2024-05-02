import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ManagementPage.css';

const ManagementPage = () => {
    const [cards, setCards] = useState([]);
    const [sortConfig, setSortConfig] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/saved-cards')
            .then(response => response.json())
            .then(data => {
                console.log('Received saved cards:', data);
                setCards(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleReset = () => {
        fetch('http://localhost:8080/clear-saved-cards', { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                fetch('http://localhost:8080/saved-cards')  // Refetch the data
                    .then(response => response.json())
                    .then(data => setCards(data))
                    .catch(error => console.error('Error refetching data:', error));
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to clear cards.');
            });
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        const sortedCards = [...cards].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setCards(sortedCards);
        setSortConfig({ key, direction });
    };

    return (
        <div className="management-page">
            <h1>My Saved Cards</h1>
            <div className="home-button-container">
                <button onClick={handleReset} className="reset-button">Reset Saved Cards</button>
                <Link to="/">
                    <button className="management-home-button">Back to Home</button>
                </Link>
                <Link to="/open-pack">
                    <button className="management-open-pack-button">Open Pack Page</button>
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th><button onClick={() => handleSort('PLAYER_NAME')} className="sort-button">Player Name</button></th>
                        <th><button onClick={() => handleSort('AVG_EFF')} className="sort-button">Average Efficiency</button></th>
                        <th><button onClick={() => handleSort('AVG_PTS')} className="sort-button">Average Points</button></th>
                        <th><button onClick={() => handleSort('AVG_REB')} className="sort-button">Average Rebounds</button></th>
                        <th><button onClick={() => handleSort('AVG_AST')} className="sort-button">Average Assists</button></th>
                        <th><button onClick={() => handleSort('TEAM_ID')} className="sort-button">Team ID</button></th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map((card, index) => (
                        <tr key={index}>
                            <td>{card.PLAYER_NAME}</td>
                            <td>{parseFloat(card.AVG_EFF).toFixed(2)}</td>
                            <td>{parseFloat(card.AVG_PTS).toFixed(2)}</td>
                            <td>{parseFloat(card.AVG_REB).toFixed(2)}</td>
                            <td>{parseFloat(card.AVG_AST).toFixed(2)}</td>
                            <td>{card.TEAM_ID}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManagementPage;