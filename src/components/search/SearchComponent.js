import React, { useState } from 'react';

// SearchComponent component
const SearchComponent = () => {
	const [query, setQuery] = useState('');

	// Handle search
	const handleQuerySearch = (e) => {
		e.preventDefault();
	};

	// Render the SearchComponent component
	return (
		<div>
			<h2>Search</h2>
			<form onSubmit={handleQuerySearch}>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search Books..."
				/>
				<button type="submit">Search</button>
			</form>
		</div>
	);
};

export default SearchComponent;