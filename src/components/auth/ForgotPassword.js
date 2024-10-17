import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
	e.preventDefault();
	try {
	  await axios.post('http://localhost:8801/api/auth/reset-password', { email });
	  setMessage('Password reset email sent. Please check your inbox.');
	} catch (error) {
	  console.error('Failed to send password reset email:', error);
	  setMessage('Failed to send password reset email. Please try again.');
	}
  };

  return (
	<div className="forgot-password-container">
	  <h1>Forgot Password</h1>
	  <form onSubmit={handleSubmit}>
		<div className="form-group">
		  <label>Email:</label>
		  <input
			type="email"
			value={email}
			onChange={(e) => setEmail(e.target.value)}
			required
		  />
		</div>
		<button type="submit">Send Reset Email</button>
	  </form>
	  {message && <p>{message}</p>}
	</div>
  );
};

export default ForgotPassword;