import React from 'react';

// SearchResults component
const SearchResults = ({ results }) => {
	return (
		<div>
			<h2>Search Results</h2>
			<ul>
				{results.map((book) => (
					<li key={book.id}>
						{book.title} by {book.author}
					</li>
				))}
			</ul>
		</div>
	);
};

export default SearchResults;