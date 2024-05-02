import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to the NBA Card Collector</h1>
      <div className="home-button-container">
        <Link to="/open-pack">
          <button className="home-openpack-button">Open Pack Page</button>
        </Link>
        <Link to="/management">
          <button className="home-management-button">Card Management Page</button>
        </Link>
      </div>
      {/* <Link to="/dictionary"><button>Player Dictionary</button></Link> */}
    </div>
  );
};

export default HomePage;