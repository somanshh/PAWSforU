const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const dogRoutes = require('./routes/dogRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running!');
});
app.use('/api/auth', authRoutes);
app.use('/api/dogs', dogRoutes);
app.use('/api/adoptions', adoptionRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;