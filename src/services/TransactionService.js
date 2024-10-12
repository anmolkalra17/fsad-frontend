import axios from 'axios';

const API_URL = 'http://localhost:8801/api/transactions/';

const getTransactions = () => {
  return axios.get(API_URL);
};

const cancelTransaction = (id) => {
  return axios.put(API_URL + id + '/cancel');
};

const TransactionService = {
  getTransactions,
  cancelTransaction,
};

export default TransactionService;