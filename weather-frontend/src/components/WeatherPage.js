import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function WeatherPage() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city.trim()) return;

    try {
      const response = await axios.get(`http://localhost:8000/weather?city=${encodeURIComponent(city)}`);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setWeather(null);
      setError('❌ City not found or API error.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Weather Dashboard</h2>
        <div className="input-group my-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn btn-success" onClick={fetchWeather}>
            Get Weather
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {weather && (
          <div className="card p-3">
            <h4>{weather.name}, {weather.sys.country}</h4>
            <p><strong>🌡 Temperature:</strong> {weather.main.temp} °C</p>
            <p><strong>🌤 Condition:</strong> {weather.weather[0].description}</p>
            <p><strong>💧 Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>💨 Wind Speed:</strong> {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </>
  );
}

export default WeatherPage;
