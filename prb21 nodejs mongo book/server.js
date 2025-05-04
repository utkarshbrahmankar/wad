const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Book = require('./models/book.js');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Add a new book
app.post('/api/books', async (req, res) => {
  const { title, author, price, genre } = req.body;
  const book = new Book({ title, author, price, genre });
  await book.save();
  res.send(book);
});

// Get all books
app.get('/api/books', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

// Update a book
app.put('/api/books/:id', async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(book);
});

// Delete a book
app.delete('/api/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.send({ message: 'Book deleted' });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
