import React, { useEffect, useState } from 'react';
import TransactionService from '../../services/TransactionService';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

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