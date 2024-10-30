import React, { useEffect, useState } from 'react';
import TransactionService from '../../services/TransactionService';

// TransactionList component
const TransactionList = () => {
	const [userTransactions, setUserTransactions] = useState([]);

	// Fetch transactions
	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const response = await TransactionService.getTransactions();
				setUserTransactions(response.data);
			} catch (error) {
				alert('Failed to fetch transactions');
			}
		};

		fetchTransactions();
	}, []);

	// Render the TransactionList component
	return (
		<div>
			<h2>Transaction History</h2>
			<ul>
				{userTransactions.map((userTransaction) => (
					<li key={userTransaction.id}>
						{userTransaction.bookTitle} - {userTransaction.status}
					</li>
				))}
			</ul>
		</div>
	);
};

export default TransactionList;