const express = require('express');
const userRoutes = require('./routes/userRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Custom request logger middleware

app.use(logger);

// Routes
app.use('/users', userRoutes);

// Start server

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
