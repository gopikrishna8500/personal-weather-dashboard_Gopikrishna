import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function DashboardPage() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/weather?city=${city}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('❌ Failed to fetch weather. Try again.');
      setWeather(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-3">🌤 Weather Dashboard</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            placeholder="Enter city name"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn btn-primary" onClick={fetchWeather}>Get Weather</button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {weather && (
          <div className="card text-white bg-info p-4">
            <div className="d-flex align-items-center">
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt="icon"
                style={{ width: '80px', marginRight: '20px' }}
              />
              <div>
                <h3>{weather.city}</h3>
                <p>{weather.description}</p>
                <p>🌡 Temperature: {weather.temperature} °C</p>
                <p>💧 Humidity: {weather.humidity}%</p>
                <p>🌬 Wind Speed: {weather.wind_speed} m/s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DashboardPage;
