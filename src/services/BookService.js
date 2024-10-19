import axios from 'axios';

const API_URL = 'http://localhost:8801/api/books/';

const addBook = (book) => {
  return axios.post(API_URL, book);
};

const editBook = (id, book) => {
  return axios.put(API_URL + id, book);
};

const deleteBook = (id) => {
  return axios.delete(API_URL + id);
};

const getBooks = () => {
  return axios.get(API_URL);
};

const searchBooks = (query) => {
  return axios.get(API_URL + 'search', { params: query });
};

const getBookById = (id) => {
  return axios.get(API_URL + id.toString());
};

const BookService = {
  addBook,
  editBook,
  deleteBook,
  getBooks,
  searchBooks,
  getBookById
};

export default BookService;