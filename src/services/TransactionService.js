import axios from 'axios';

//  Base URL
const BASE_URL = 'http://localhost:8801/api/transactions/';

//  Create transaction route
const createTransaction = (userId, bookId, recipientUserId) => {
  const token = localStorage.getItem('token');
  return axios.post(BASE_URL + 'create', { userId: userId, bookId: bookId, recipientUserId: recipientUserId }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

//  Get transactions route
const getTransactions = () => {
  const token = localStorage.getItem('token');
  return axios.get(BASE_URL + 'history', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

//  Cancel transaction route
const cancelTransaction = (id) => {
  const token = localStorage.getItem('token');
  return axios.delete(BASE_URL + 'cancel/' + id, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

//  Update transaction route
const updateTransaction = (id, status) => {
  const token = localStorage.getItem('token');
  return axios.put(BASE_URL + 'update/' + id, { status: status }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

//  Get borrow requests route
const getBorrowRequests = () => {
  const token = localStorage.getItem('token');
  return axios.get(BASE_URL + 'received/', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

//  Create transaction service
const TransactionService = {
  createTransaction,
  getTransactions,
  cancelTransaction,
  updateTransaction,
  getBorrowRequests
};

export default TransactionService;