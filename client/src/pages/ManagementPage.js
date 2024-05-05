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
                <Link to="/search">
                    <button className="home-search-button">Search Players</button>
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th><button onClick={() => handleSort('PLAYER_NAME')} className="sort-button">Player Name</button></th>
                        <th><button onClick={() => handleSort('AVG_EFF')} className="sort-button">Efficiency</button></th>
                        <th><button onClick={() => handleSort('3pt_rank')} className="sort-button">3PT Rank</button></th>
                        <th><button onClick={() => handleSort('fg_rank')} className="sort-button">FG Rank</button></th>
                        <th><button onClick={() => handleSort('defensive_rank')} className="sort-button">Defensive Rank</button></th>
                        <th><button onClick={() => handleSort('assist_rank')} className="sort-button">Teamwork</button></th>
                        <th><button onClick={() => handleSort('NICKNAME')} className="sort-button">Current Team</button></th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map((card, index) => (
                        <tr key={index}>
                            <td>{card.PLAYER_NAME}</td>
                            <td>{parseFloat(card.AVG_EFF).toFixed(1)}</td>
                            <td>{card['3pt_rank']}</td>
                            <td>{card.fg_rank}</td>
                            <td>{card.defensive_rank}</td>
                            <td>{card.assist_rank}</td>
                            <td>{card.NICKNAME}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManagementPage;