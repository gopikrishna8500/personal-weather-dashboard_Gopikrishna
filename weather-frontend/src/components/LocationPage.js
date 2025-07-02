import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function LocationPage() {
  const [formData, setFormData] = useState({
    city: '',
    country: '',
    latitude: '',
    longitude: ''
  });

  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:8000/get-location', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setFormData({
        city: res.data.city || '',
        country: res.data.country || '',
        latitude: res.data.latitude || '',
        longitude: res.data.longitude || ''
      });
    })
    .catch(() => {
      setMessage('Could not fetch saved location');
    });
  }, [token]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8000/update-location', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('✅ Location updated successfully');
    } catch {
      setMessage('❌ Failed to update location');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Update Your Location</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>City</label>
            <input
              className="form-control"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Country</label>
            <input
              className="form-control"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Latitude</label>
            <input
              className="form-control"
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Longitude</label>
            <input
              className="form-control"
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary">Save Location</button>
        </form>
      </div>
    </>
  );
}

export default LocationPage;
