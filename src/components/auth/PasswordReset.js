import React, { useState } from 'react';
import UserService from '../../services/UserService';

const PasswordReset = () => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async (e) => {
	e.preventDefault();
	try {
	  await UserService.resetPassword(email);
	  alert('Password reset email sent');
	} catch (error) {
	  alert('Password reset failed');
	}
  };

  return (
	<form onSubmit={handlePasswordReset}>
	  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
	  <button type="submit">Reset Password</button>
	</form>
  );
};

export default PasswordReset;