import React, { useState } from 'react';

const SearchComponent = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
	e.preventDefault();
	// Implement search logic here
	console.log('Searching for:', query);
  };

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