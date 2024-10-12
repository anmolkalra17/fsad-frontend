import React from 'react';
import UserService from '../../services/UserService';

const Logout = () => {
  const handleLogout = async () => {
	try {
	  await UserService.logout();
	  alert('Logout successful');
	} catch (error) {
	  alert('Logout failed');
	}
  };

  return (
	<button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;