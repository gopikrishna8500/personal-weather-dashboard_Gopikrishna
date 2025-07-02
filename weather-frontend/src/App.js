import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import WeatherPage from './components/WeatherPage';
import LocationPage from './components/LocationPage';
import FeedbackPage from './components/FeedbackPage'; // ✅ Imported

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for token on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <WeatherPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/location"
          element={
            isAuthenticated ? <LocationPage /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/feedback"
          element={
            isAuthenticated ? <FeedbackPage /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
