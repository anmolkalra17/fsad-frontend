import axios from 'axios';

const API_URL = 'http://localhost:8801/api/transactions/';

const createTransaction = (id) => {
  const token = localStorage.getItem('token');
  return axios.post(API_URL + 'create', { bookId: id }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

const getTransactions = () => {
  const token = localStorage.getItem('token');
  return axios.get(API_URL + 'history', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const cancelTransaction = (id) => {
  const token = localStorage.getItem('token');
  return axios.delete(API_URL + 'cancel/' + id, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const updateTransaction = (id, status) => {
  const token = localStorage.getItem('token');
  return axios.put(API_URL + 'update/' + id, status, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const TransactionService = {
  createTransaction,
  getTransactions,
  cancelTransaction,
  updateTransaction
};

export default TransactionService;