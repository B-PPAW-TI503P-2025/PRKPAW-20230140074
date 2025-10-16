// ===== Import Module =====
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;



// ===== Middleware =====
app.use(cors()); // izinkan akses dari React (frontend)
app.use(express.json()); // parsing body JSON

// Middleware custom untuk logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// ===== Routing dasar =====
app.get('/', (req, res) => {
  res.send('Home Page for API');
});

// ===== Routing CRUD Buku =====
const bookRoutes = require('./routes/books');
app.use('/api/books', bookRoutes);

// ===== Middleware Error Handling =====
// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// ===== Jalankan Server =====
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;

  // Cari buku berdasarkan ID
  const bookIndex = books.findIndex(b => b.id === parseInt(id));
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  // Validasi input
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  // Update data buku
  books[bookIndex] = { id: parseInt(id), title, author };

  res.json({
    message: 'Book updated successfully',
    book: books[bookIndex]
  });
});

// ====== DELETE (hapus buku berdasarkan ID) ======
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // Cari buku berdasarkan ID
  const bookIndex = books.findIndex(b => b.id === parseInt(id));
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  // Hapus dari array
  const deletedBook = books.splice(bookIndex, 1)[0];

  res.json({
    message: 'Buku berhasil dihapus',
    deleted: deletedBook
  });
});
