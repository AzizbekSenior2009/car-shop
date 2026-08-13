const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const carRoutes = require('./routes/carRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

app.use('/api/cars', carRoutes);
app.use('/api/enquiries', enquiryRoutes);

// MongoDB connection (Optional - won't crash if it fails)
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/carshop', { serverSelectionTimeoutMS: 2000 })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB not found. Using local JSON fallback for enquiries.'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});