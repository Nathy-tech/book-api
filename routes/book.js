const express = require('express');
const Book = require('../models/book');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new book (Accessible to users)
router.post('/books', authenticateToken, (req, res) => {
  const { title, author, description } = req.body;

  const book = new Book({ title, author, description });
  book.save()
    .then((book) => res.status(201).json(book))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Get all books (Admin only)
router.get('/books/all', authenticateToken, authorizeRole(['admin']), (req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Get books (Users can see their own books or all books if unrestricted)
router.get('/books', authenticateToken, (req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Book recommendations (Custom endpoint)
router.get('/books/recommendations', authenticateToken, (req, res) => {
  // For simplicity, we're returning all books
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
