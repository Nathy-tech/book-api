const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api', bookRoutes);

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
