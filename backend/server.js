const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Car = require('./models/Car');
const Enquiry = require('./models/Enquiry');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const fs = require('fs');
const path = require('path');

// MongoDB connection (Optional - won't crash if it fails)
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/carshop', { serverSelectionTimeoutMS: 2000 })
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB not found. Using local JSON fallback for enquiries.'));

// Routes
app.get('/api/cars', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }
    const { isFeatured } = req.query;
    let query = {};
    if (isFeatured === 'true') {
      query.isFeatured = true;
    }
    const cars = await Car.find(query);
    res.json(cars);
  } catch (err) {
    // Return empty array if DB fails so frontend uses mock data
    res.json([]);
  }
});

app.post('/api/enquiries', async (req, res) => {
  try {
    // Save to local JSON file as fallback since MongoDB isn't running
    const enquiry = {
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    const filePath = path.join(__dirname, 'enquiries.json');
    let enquiries = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      enquiries = JSON.parse(data || '[]');
    }
    enquiries.push(enquiry);
    fs.writeFileSync(filePath, JSON.stringify(enquiries, null, 2));

    res.status(201).json({ message: 'Enquiry saved successfully to enquiries.json', data: enquiry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
