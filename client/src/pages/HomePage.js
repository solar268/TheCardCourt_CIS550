import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import logo from '../images/logo.jpg';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="welcome-container">
        <h1 className="welcome-text">Welcome to the NBA Card Collector</h1>
      </div>
      <div className="home-button-container">
        <Link to="/open-pack">
          <button className="home-openpack-button">Open Pack Page</button>
        </Link>
        <Link to="/management">
          <button className="home-management-button">Card Management Page</button>
        </Link>
      </div>
      <div className="logo-container">
        <img src={logo} alt="NBA Card Collector Logo" className="project-logo" />
        <div className="project-description">
          <h2>Card Court</h2>
          <p>TheCardCourt is an innovative project developed by Luke Schalles, Jay Moon, Armaan Rathi, and Sean Chuang for CIS550. This project aims to leverage extensive NBA statistics, sourced from Kaggle and the NBA Advanced Statistics website, to create engaging applications that basketball fans and data enthusiasts will love.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
