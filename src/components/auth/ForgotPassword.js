import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import UserService from '../../services/UserService';

// ForgotPassword component
const ForgotPassword = () => {
	const [userEmail, setUserEmail] = useState('');
	const [responseMessage, setResponseMessage] = useState('');
	const [responseMessageType, setResponseMessageType] = useState('');
	const [newUserPassword, setNewUserPassword] = useState('');
	const [confirmNewUserPassword, setConfirmNewUserPassword] = useState('');

	const location = useLocation();
	const navigate = useNavigate();

	const urlQuery = new URLSearchParams(location.search);
	const authToken = urlQuery.get('token');

	// Handle form submission
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			await UserService.sendPasswordResetEmail(userEmail);
			setResponseMessage('Password reset email sent. Please check your inbox.');
			setResponseMessageType('success');
		} catch (error) {
			setResponseMessage('Failed to send password reset email. Please try again.');
			setResponseMessageType('error');
		}
	};

	// Handle password reset
	const handlePasswordReset = async (e) => {
		e.preventDefault();
		if (newUserPassword !== confirmNewUserPassword) {
			setResponseMessage('Passwords do not match.');
			return;
		}
		try {
			await UserService.resetPassword(authToken, newUserPassword);
			alert('Password has been reset successfully.');
			navigate('/login');
		} catch (error) {
			alert('Failed to reset password:', error);
			setResponseMessage('Failed to reset password. Please try again.');
		}
	};

	// Render the ForgotPassword component
	return (
		<div className="forgot-password-container">
			{authToken ? (
				<>
					<h1>Reset Password</h1>
					<form onSubmit={handlePasswordReset}>
						<input
							type="password"
							placeholder="Enter new password"
							value={newUserPassword}
							onChange={(e) => setNewUserPassword(e.target.value)}
							required
						/>
						<input
							type="password"
							placeholder="Confirm new password"
							value={confirmNewUserPassword}
							onChange={(e) => setConfirmNewUserPassword(e.target.value)}
							required
						/>
						<button type="submit">Reset Password</button>
					</form>
				</>
			) : (
				<>
					<h1>Forgot Password</h1>
					<form onSubmit={handleFormSubmit}>
						<input
							type="email"
							placeholder="Enter your email"
							value={userEmail}
							onChange={(e) => setUserEmail(e.target.value)}
							required
						/>
						<button type="submit">Send Reset Link</button>
					</form>
				</>
			)}
			{responseMessage && (
				<div className={`message ${responseMessageType}`}>
					{responseMessage}
				</div>
			)}
		</div>
	);
};

export default ForgotPassword;