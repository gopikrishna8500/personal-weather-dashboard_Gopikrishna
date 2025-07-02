import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">WeatherApp</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/location">Location</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/feedback">Feedback</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
