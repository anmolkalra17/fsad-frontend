import React from 'react';
import UserService from '../../services/UserService';

// Logout component
const Logout = () => {
	const handleLogoutClick = async () => {
		try {
			await UserService.logout();
			alert('Logout successful');
		} catch (error) {
			alert('Logout failed');
		}
	};

	return (
		<button onClick={handleLogoutClick}>Logout</button>
	);
};

export default Logout;