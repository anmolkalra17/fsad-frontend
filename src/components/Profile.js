import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import './Profile.css';

const Profile = () => {
	const [user, setUser] = useState('');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
		const fetchUser = async () => {
            try {
                const response = await UserService.getUserProfile(userId);
                setUser(response.data);
            } catch (error) {
                alert('Failed to fetch user details');
                console.log(error);
            }
        };

        fetchUser();
	}, [userId]);

	const logout = () => {
		// Clear user session and redirect to login page
		sessionStorage.clear();
		window.history.replaceState(null, null, window.location.href);
		window.location.href = '/login';
	};

	return (
		<div className="profile-container">
			<h1 className="profile-header">Profile Page</h1>
			<h2 className="profile-name">{user.username}</h2>
			<p className="profile-email">{user.email}</p>
			<button onClick={logout} className="logout-button">
				Logout
			</button>
		</div>
	);
};

export default Profile;