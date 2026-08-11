const fs = require('fs');
const path = require('path');
const Enquiry = require('../models/Enquiry');
const mongoose = require('mongoose');

const createEnquiry = async (req, res) => {
  try {
    const enquiryData = {
      ...req.body,
      createdAt: new Date().toISOString()
    };

    // If MongoDB is connected, save to DB
    if (mongoose.connection.readyState === 1) {
      const enquiry = new Enquiry(enquiryData);
      await enquiry.save();
      return res.status(201).json({ message: 'Enquiry saved successfully to DB', data: enquiry });
    }

    // Fallback: Save to local JSON file
    const filePath = path.join(__dirname, '..', 'enquiries.json');
    let enquiries = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      enquiries = JSON.parse(data || '[]');
    }
    enquiries.push(enquiryData);
    fs.writeFileSync(filePath, JSON.stringify(enquiries, null, 2));

    res.status(201).json({ message: 'Enquiry saved successfully to enquiries.json', data: enquiryData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createEnquiry
};
