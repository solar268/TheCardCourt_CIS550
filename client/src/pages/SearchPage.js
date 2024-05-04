import React, { useState } from 'react';
import './SearchPage.css';

const SearchPage = () => {
    const [name, setName] = useState('');
    const [season, setSeason] = useState('');
    const [team, setTeam] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        const query = new URLSearchParams({ name, season, team }).toString();
        fetch(`http://localhost:8080/players/search?${query}`)
            .then(response => response.json())
            .then(data => setResults(data))
            .catch(error => console.error('Error fetching data:', error));
    };

    return (
        <div className="search-page"> {/* Main container with background styling */}
            <div className="search-container"> {/* Form and inputs */}
                <h1>Search NBA Players</h1>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Player Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Season"
                    value={season}
                    onChange={e => setSeason(e.target.value)}
                />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Team Abbreviation"
                    value={team}
                    onChange={e => setTeam(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
            <div className="table-container">
                {results.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Season</th>
                                <th>Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((player, index) => (
                                <tr key={index}>
                                    <td>{player.PLAYER_NAME}</td>
                                    <td>{player.SEASON}</td>
                                    <td>{player.TEAM_ABBREVIATION}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
