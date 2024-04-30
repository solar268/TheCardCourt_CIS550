import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to the NBA Card Collector</h1>
      <Link to="/open-pack">
        <button className="openpack_button">Open Pack</button>
      </Link>
      {/* <Link to="/team"><button>Manage Team</button></Link> */}
      {/* <Link to="/dictionary"><button>Player Dictionary</button></Link> */}
    </div>
  );
};

export default HomePage;