import React, { useEffect, useState } from 'react';
import TransactionService from '../../services/TransactionService';

// TransactionList component
const TransactionList = () => {
	const [transactions, setTransactions] = useState([]);

	// Fetch transactions
	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const response = await TransactionService.getTransactions();
				setTransactions(response.data);
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
				{transactions.map((transaction) => (
					<li key={transaction.id}>
						{transaction.bookTitle} - {transaction.status}
					</li>
				))}
			</ul>
		</div>
	);
};

export default TransactionList;