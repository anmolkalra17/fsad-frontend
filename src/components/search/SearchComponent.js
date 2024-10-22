import React, { useState } from 'react';

// SearchComponent component
const SearchComponent = () => {
	const [query, setQuery] = useState('');

	// Handle search
	const handleSearch = (e) => {
		e.preventDefault();
	};

	// Render the SearchComponent component
	return (
		<div>
			<h2>Search</h2>
			<form onSubmit={handleSearch}>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search..."
				/>
				<button type="submit">Search</button>
			</form>
		</div>
	);
};

export default SearchComponent;