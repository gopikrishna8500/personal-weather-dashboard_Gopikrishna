import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^\S+@\S+\.\S+$/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage('❌ Invalid email format.');
      return;
    }

    if (password.length < 6) {
      setMessage('❌ Password must be at least 6 characters.');
      return;
    }

    try {
      await API.post('/register', { email, password });
      setMessage('✅ Registered successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setMessage('❌ Registration failed. Email may already be used.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          className="form-control my-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control my-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary">Register</button>
      </form>
      {message && <p className="mt-2 text-danger">{message}</p>}
    </div>
  );
}

export default RegisterPage;
