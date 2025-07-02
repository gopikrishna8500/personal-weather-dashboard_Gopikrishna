import React, { useState } from 'react';
import Navbar from './Navbar';

function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate sending feedback (you can replace this with API later)
    console.log('Feedback submitted:', { name, email, message });

    setStatus('✅ Thank you for your feedback!');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>📬 Feedback</h2>
        <p>We’d love to hear your thoughts!</p>

        {status && <div className="alert alert-success">{status}</div>}

        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Message:</label>
            <textarea
              className="form-control"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button className="btn btn-success">Submit Feedback</button>
        </form>
      </div>
    </>
  );
}

export default FeedbackPage;
