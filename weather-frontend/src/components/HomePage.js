import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './HomePage.css'; // ✅ Import external CSS

function HomePage() {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="overlay">
          <h1 className="home-title">Welcome to Weather Dashboard</h1>
          <p className="home-subtitle">Check current weather and forecast info anytime.</p>
          <div className="home-buttons">
            <Link to="/login" className="btn btn-primary mx-2">Login</Link>
            <Link to="/register" className="btn btn-success mx-2">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
