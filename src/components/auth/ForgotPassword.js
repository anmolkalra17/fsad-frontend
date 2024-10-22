import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import UserService from '../../services/UserService';

// ForgotPassword component
const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const location = useLocation();
	const navigate = useNavigate();

	const query = new URLSearchParams(location.search);
	const token = query.get('token');

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await UserService.sendPasswordResetEmail(email);
			setMessage('Password reset email sent. Please check your inbox.');
			setMessageType('success');
		} catch (error) {
			setMessage('Failed to send password reset email. Please try again.');
			setMessageType('error');
		}
	};

	// Handle password reset
	const handlePasswordReset = async (e) => {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			setMessage('Passwords do not match.');
			return;
		}
		try {
			await UserService.resetPassword(token, email, newPassword);
			alert('Password has been reset successfully.');
			navigate('/login');
		} catch (error) {
			alert('Failed to reset password:', error);
			setMessage('Failed to reset password. Please try again.');
		}
	};

	// Render the ForgotPassword component
	return (
		<div className="forgot-password-container">
			{token ? (
				<>
					<h1>Reset Password</h1>
					<form onSubmit={handlePasswordReset}>
						<input
							type="password"
							placeholder="Enter new password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							required
						/>
						<input
							type="password"
							placeholder="Confirm new password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
						<button type="submit">Reset Password</button>
					</form>
				</>
			) : (
				<>
					<h1>Forgot Password</h1>
					<form onSubmit={handleSubmit}>
						<input
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<button type="submit">Send Reset Link</button>
					</form>
				</>
			)}
			{message && (
				<div className={`message ${messageType}`}>
					{message}
				</div>
			)}
		</div>
	);
};

export default ForgotPassword;